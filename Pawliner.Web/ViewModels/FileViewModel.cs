using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Pawliner.Web.ViewModels
{
    public class FileViewModel
    {
        public int Id { get; set; }
        public List<IFormFile> Files { get; set; }
    }
}
