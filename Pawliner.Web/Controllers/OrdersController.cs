using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pawliner.DataProvider.Context;
using Pawliner.DataProvider.Models;
using Pawliner.Web.ViewModels;
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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(CreateOrderViewModel model)
        {
            if (ModelState.IsValid)
            {
                var param = new SqlParameter
                {
                    ParameterName = "@id",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 50
                };

                await _database.Database.ExecuteSqlCommandAsync("dbo.GET_SERVICE_ID @service, @id OUT", 
                    new SqlParameter("@service", model.Service), param);

                var serviceId = param.Value;
                await _database.Database.ExecuteSqlCommandAsync("dbo.INSERT_ORDER @header," +
                    "@description," +
                    "@city," +
                    "@address," +
                    "@price," +
                    "@name," +
                    "@phoneNumber," +
                    "@completedOn," +
                    "@userId," +
                    "@serviceId", 
                    new SqlParameter("@header", model.Header),
                    new SqlParameter("@description", model.Description),
                    new SqlParameter("@city", model.City),
                    new SqlParameter("@address", model.Address),
                    new SqlParameter("@price", model.Price),
                    new SqlParameter("@name", model.Name),
                    new SqlParameter("@phoneNumber", model.Number),
                    new SqlParameter("@completedOn", model.CompletedOn),
                    new SqlParameter("@userId", model.UserId),
                    new SqlParameter("@serviceId", serviceId));

                return Ok(model);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(EditOrderViewModel model)
        {
            if (ModelState.IsValid)
            {
                var param = new SqlParameter
                {
                    ParameterName = "@id",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Direction = System.Data.ParameterDirection.Output,
                    Size = 50
                };

                await _database.Database.ExecuteSqlCommandAsync("dbo.GET_SERVICE_ID @service, @id OUT",
                    new SqlParameter("@service", model.Service), param);

                var serviceId = param.Value;
                await _database.Database.ExecuteSqlCommandAsync("dbo.UPDATE_ORDER @id, " +
                    "@header," +
                    "@description," +
                    "@city," +
                    "@address," +
                    "@price," +
                    "@name," +
                    "@phoneNumber," +
                    "@completedOn," +
                    "@serviceId",
                    new SqlParameter("@id", model.Id),
                    new SqlParameter("@header", model.Header),
                    new SqlParameter("@description", model.Description),
                    new SqlParameter("@city", model.City),
                    new SqlParameter("@address", model.Address),
                    new SqlParameter("@price", model.Price),
                    new SqlParameter("@name", model.Name),
                    new SqlParameter("@phoneNumber", model.Number),
                    new SqlParameter("@completedOn", model.CompletedOn),
                    new SqlParameter("@serviceId", serviceId));

                return Ok(model);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.DELETE_ORDER @id",
                    new SqlParameter("@id", id));

                return Ok(id);
            }

            return BadRequest();
        }
    }
}
