using System.ComponentModel.DataAnnotations;

namespace HRM2
{
    [RsEnum]
    public enum Gender : byte
    {
        [Display(Name = "Khác")]
        Unknow = 0,
        [Display(Name = "Name")]
        Male = 1,
        [Display(Name = "Nữ")]
        Female = 2
    }
}