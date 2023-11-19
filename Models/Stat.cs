namespace GrowHub.Models
{
    public class Stat
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public double Donated { get; set; }
        public double CompaignsCompleted { get; set; }
        public double Needed { get; set; }
    }
}
