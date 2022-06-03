using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class Role : IdentityRole<int>
    {
        public int DepartmentId { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public IdentityStatus Status { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }
    }

}