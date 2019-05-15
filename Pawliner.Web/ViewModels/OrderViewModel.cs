using Pawliner.DataProvider.Models;
using System.Collections.Generic;

namespace Pawliner.Web.ViewModels
{
    public class OrderViewModel
    {
        public Order Order { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
