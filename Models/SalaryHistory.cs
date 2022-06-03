using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class SalaryHistory
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime AppliedDate { get; set; }

        public double Salary { get; set; }
        public double Allowance { get; set; }
        public string Reason { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }

}