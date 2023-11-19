using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GrowHub.Models
{
    public class Compaign
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public string AuthorId { get; set; }

        [ForeignKey("AuthorId")]
        public User? User { get; set; }
        public bool Funded { get; set; } = false;
        public string? RequiredMoney { get; set; } = "";
        public string? DonatedMoney { get; set; } = "";
        public bool Completed { get; set; } = false;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}
