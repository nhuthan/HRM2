using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace HRM2
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ProfileAttachment>()
                .HasKey(e => new { e.ProfileId, e.AttachmentId });
        }

        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<LeaveApplication> LeaveApplications { get; set; }
        public DbSet<UserReview> UserReviews { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<SalaryHistory> SalaryHistories { get; set; }
        public DbSet<ProfileAttachment> ProfileAttachments { get; set; }

    }
}