using System.ComponentModel.DataAnnotations;

namespace HRM2
{
    [RsEnum]
    public enum ProfileType : byte
    {
        [Display(Name = "Khác")]
        Other = 0,

        [Display(Name = "Sơ yếu lý lịch")]
        CurriculumVitae = 1,

        [Display(Name = "Căn cước công dân")]
        CitizenID = 2,

        [Display(Name = "Hợp đồng")]
        Contract = 3,

        [Display(Name = "Bảo hiểm")]
        Insurance = 4
    }
}