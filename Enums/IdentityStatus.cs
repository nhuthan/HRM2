using System.ComponentModel.DataAnnotations;

namespace HRM2
{
    [RsEnum]
    public enum IdentityStatus : byte
    {
        [Display(Name = "Ngừng hoạt động")]
        Inactive = 0,
        [Display(Name = "Đang hoạt động")]
        Active = 1,
        [Display(Name = "Đã xóa")]
        Deleted = 2,
    }
}