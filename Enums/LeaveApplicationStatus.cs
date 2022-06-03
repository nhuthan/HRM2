using System.ComponentModel.DataAnnotations;

namespace HRM2
{
    public enum LeaveApplicationStatus : byte
    {
        [Display(Name = "Chờ duyệt")]
        Pending = 0,
        [Display(Name = "Đã chấp nhận")]
        Approved = 1,
        [Display(Name = "Bị từ chối")]
        Rejected = 2
    }
}