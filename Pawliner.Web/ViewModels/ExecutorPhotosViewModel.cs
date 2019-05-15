using Pawliner.DataProvider.Models;
using System.Collections.Generic;

namespace Pawliner.Web.ViewModels
{
    public class ExecutorPhotosViewModel
    {
        public Executor Executor { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
