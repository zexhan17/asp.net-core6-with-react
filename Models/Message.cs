using System.ComponentModel.DataAnnotations.Schema;

namespace GrowHub.Models
{
    public class Message
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Text { get; set; }
        public string Sender { get; set; }

        [ForeignKey("Sender")]
        public User? User { get; set; }
    }
}
