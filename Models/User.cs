using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class User : IdentityUser<int>
    {
        [MaxLength(300)]
        public string Avatar { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [MaxLength(100)]
        public string FullName { get; set; }

        public Gender Gender { get; set; }

        public string Address { get; set; }

        public DateTime CreatedDate { get; set; }

        public IdentityStatus Status { get; set; }
    }

}