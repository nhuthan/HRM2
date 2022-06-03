using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{

    public class UserProfile
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Content { get; set; }

        public ProfileType Type { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual ICollection<ProfileAttachment> Attachments { get; set; }
    }

    public class ProfileAttachment
    {
        public int AttachmentId { get; set; }
        public int ProfileId { get; set; }

        [ForeignKey("AttachmentId")]
        public virtual Attachment Attachment { get; set; }

        [ForeignKey("ProfileId")]
        public virtual UserProfile Profile { get; set; }
    }

}