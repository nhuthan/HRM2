using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRM2.Controllers
{
    [Route("/admin")]
    public class HomeController : ControllerBase
    {
        ApplicationDbContext db;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<Role> roleManager;

        public HomeController(ApplicationDbContext dbContext, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            this.db = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpGet("init")]
        public async Task<IActionResult> Init(string adminUserName = "admin", string adminPassword = "abc@123", string adminEmail = "none@gmail.com")
        {
            // nếu chưa có user nào thì tạo tk admin
            if (!db.Users.Any())
            {
                var result = await userManager.CreateAsync(new User
                {
                    FullName = "System Admin",
                    UserName = adminUserName,
                    Email = adminEmail,
                    CreatedDate = DateTime.UtcNow,
                    Status = IdentityStatus.Active
                }, adminPassword);
            }

            return Content("Done");
        }
    }
}