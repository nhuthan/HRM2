using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace HRM2.Controllers
{
    [Route("/account")]
    public class UserController : ControllerBase
    {
        ApplicationDbContext db;
        UserManager<User> userManager;
        SignInManager<User> signInManager;
        RoleManager<Role> roleManager;
        IConfiguration configuration;

        public UserController(
            ApplicationDbContext dbContext, UserManager<User> userManager,
            SignInManager<User> signInManager, RoleManager<Role> roleManager,
            IConfiguration configuration)
        {
            this.db = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
        }

        [HttpGet("info")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetInfo()
        {
            var userName = User.Identity.Name;
            var user = await db.Users.Select(u => new
            {
                u.FullName,
                u.Description,
                u.Avatar,
                u.Address,
                u.Gender,
                u.CreatedDate,
                u.UserName,
                u.Email,
                u.PhoneNumber
            }).Where(u => u.UserName == userName)
            .FirstOrDefaultAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            string error = null;
            if (user != null)
            {
                if (!await signInManager.CanSignInAsync(user))
                {
                    error = "Không được phép đăng nhập";
                }
                else if (userManager.SupportsUserLockout && await userManager.IsLockedOutAsync(user))
                {
                    error = "Tài khoản đang bị khóa";
                }
                else
                {
                    if (await userManager.CheckPasswordAsync(user, model.Password))
                    {
                        if (userManager.SupportsUserLockout)
                        {
                            await userManager.ResetAccessFailedCountAsync(user);
                        }
                    }
                    else
                    {
                        await userManager.AccessFailedAsync(user);
                        error = "Tài khoản hoặc mật khẩu không đúng";
                    }
                }
            }
            else
            {
                error = "Tài khoản hoặc mật khẩu không đúng";
            }

            if (error != null)
            {
                return BadRequest(new
                {
                    Error = "Đăng nhập thất bại",
                    Message = error
                });
            }

            var now = DateTime.UtcNow;
            var userId = user.Id;
            var expires = model.Remember ? now.Add(TimeSpan.FromDays(10)) : now.Add(TimeSpan.FromDays(1));

            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,  userId.ToString()),
                new Claim(ClaimTypes.Name,  user.UserName),
                new Claim("AspNet.Identity.SecurityStamp",  user.SecurityStamp)
            };

            var securityKey = configuration.GetValue<string>("SecurityKey");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: "RS",
                audience: "RS",
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: creds
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(new
            {
                AccessToken = encodedJwt,
                ExpiresIn = expires,
                User = new
                {
                    user.FullName,
                    user.Description,
                    user.Avatar,
                    user.Address,
                    user.Gender,
                    user.CreatedDate,
                    user.UserName,
                    user.Email,
                    user.PhoneNumber
                }
            });
        }
    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Remember { get; set; }
    }
}