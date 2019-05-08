namespace Pawliner.DataProvider.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string CreatedAt { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
    }
}
