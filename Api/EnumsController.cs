using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;

namespace HRM2.Api
{
    [Produces("application/json")]
    [Route("api/enums")]
    public class EnumsController : Controller
    {

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetList()
        {
            Assembly asm = System.Reflection.Assembly.GetExecutingAssembly();
            var result = new Dictionary<string, object>();
            var list = asm.GetTypes()
                    .Where(type => typeof(Enum).IsAssignableFrom(type))
                    .Where(type =>
                            type.GetCustomAttributes<RsEnumAttribute>().Any()
                        )
                    .ToList();

            list.ForEach(item =>
            {
                var mems = item.GetMembers().Where(m => m.MemberType == MemberTypes.Field && m.Name != "value__").ToList();
                var obj = mems.Select(mem =>
                {
                    var value = Enum.Parse(item, mem.Name);
                    return new
                    {
                        Name = mem.Name,
                        Value = value,
                        Num = Convert.ChangeType(value, typeof(int)),
                        Label = mem.GetCustomAttributes<DisplayAttribute>().Select(a => a.Name).FirstOrDefault() ?? mem.Name,
                    };
                });

                result.Add(item.Name, obj);
            });

            return Ok(result);

        }
    }
}