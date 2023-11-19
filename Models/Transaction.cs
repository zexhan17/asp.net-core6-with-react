namespace GrowHub.Models
{
    public class Transaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid CompaignId { get; set; }
        public string CompaignerId { get; set; }
        public string DonorId { get; set; }
        public double Amount { get; set; }
        public string Tid { get; set; }
        public bool? ReqOnlineTransfer { get; set; } = false;
        public string? Status { get; set; } = "not verify";
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
