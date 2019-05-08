using System.ComponentModel.DataAnnotations.Schema;

namespace Pawliner.DataProvider.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string CompletedOn { get; set; }
        public string Description { get; set; }
        public string CreatedAt { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Price { get; set; }
        public int Status { get; set; }
        public string FileName { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
        public int ServiceClassiferId { get; set; }
        public string ServiceClassiferDescription { get; set; }
        public string UserId { get; set; }
    }
}
