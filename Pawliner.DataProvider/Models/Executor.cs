namespace Pawliner.DataProvider.Models
{
    public class Executor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string Description { get; set; }
        public int ExecutorType { get; set; }
        public string UserId { get; set; }
        public string PhoneNumber { get; set; }
        public int Status { get; set; }
        public int PayerAccountNumber { get; set; }
        public string FullJuridicalName { get; set; }
        public string ShortJuridicalName { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        //public string ServiceClassiferId { get; set; }
        public string ServiceClassiferDescription { get; set; }
    }
}
