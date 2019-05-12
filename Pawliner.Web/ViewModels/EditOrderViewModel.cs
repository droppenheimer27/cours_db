using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pawliner.Web.ViewModels
{
    public class EditOrderViewModel
    {
        public int Id { get; set; }
        public string Service { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string CompletedOn { get; set; }
        public string Price { get; set; }
        public string Number { get; set; }
    }
}
