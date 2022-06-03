using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class LeaveApplication
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public string Reason { get; set; }

        public LeaveApplicationStatus Status { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }

}