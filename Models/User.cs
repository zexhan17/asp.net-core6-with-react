using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GrowHub.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string Name { get; set; } = "";
        public int Compaigns { get; set; } = 0;
        public string Gc_Roll_No { get; set; } = "";
        public string Clg_Roll_No { get; set; } = "";
        //public string ClgCard { get; set; } = "";
        public string Role { get; set; } = "";
        public string Account { get; set; } = "";
        public bool Verify { get; set; } = false;
        public double Receivings { get; set; } = 0;
        public double Donations { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        //[NotMapped]
        //public IFormFile? file { get; set; }
    }
}
