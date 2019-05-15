using System.Collections.Generic;

namespace Pawliner.Web.ViewModels
{
    public class HomeViewModel<T>
    {
        public IEnumerable<T> Items { get; set; }
        public PageViewModel Pagination { get; set; }
    }
}
