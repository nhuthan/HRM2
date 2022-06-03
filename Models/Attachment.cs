using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class Attachment
    {
        public int Id { get; set; }

        [MaxLength(500)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Type { get; set; }

        public int Size { get; set; }

        [MaxLength(500)]
        public string Url { get; set; }

        [MaxLength(10)]
        public string Extension { get; set; }

        public DateTime CreatedDate { get; set; }
    }

}