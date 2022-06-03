using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class Department
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string Name { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public Status Status { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
    }

}