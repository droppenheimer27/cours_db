using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pawliner.DataProvider.Context;
using Pawliner.DataProvider.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Pawliner.Web.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationContext _database;

        public OrdersController()
        {
            _database = new ApplicationContext();
        }

        [HttpGet]
        public IEnumerable<Order> Get(string search = "", string filter = "")
        {
            var orders = _database.Orders.FromSql("dbo.GET_ORDERS @search, @filter", new SqlParameter("@search", search), new SqlParameter("@filter", filter));

            return orders;
        }

        [HttpGet("{id}")]
        public async Task<Order> Get(int id)
        {
            var order = await _database.Orders.FromSql("dbo.GET_ORDER @id", new SqlParameter("@id", id)).FirstAsync();

            return order;
        }
    }
}
