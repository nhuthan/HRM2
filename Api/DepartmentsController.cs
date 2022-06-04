using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace HRM2.Api
{
    [Produces("application/json")]
    [Route("api/departments")]
    public class DepartmentsController : Controller
    {
        ApplicationDbContext db;
        public DepartmentsController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetList()
        {
            var list = await db.Departments.ToListAsync();

            return Ok(list);

        }
    }
}