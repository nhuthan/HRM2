using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class UserReview
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }
        public int Rate { get; set; }

        public string Content { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }

}