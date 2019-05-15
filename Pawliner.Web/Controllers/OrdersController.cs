using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pawliner.DataProvider.Context;
using Pawliner.DataProvider.Models;
using Pawliner.Web.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Threading.Tasks;

namespace Pawliner.Web.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationContext _database;
        private readonly IHostingEnvironment _hostingEnvironment;

        public OrdersController(IHostingEnvironment hostingEnvironment)
        {
            _database = new ApplicationContext();
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string search = "", string filter = "", int currentPage = 1, int pageSize = 3)
        {
            var orders = await _database.Orders.FromSql("dbo.GET_ORDERS @search, " +
                "@filter, " +
                "@currentPage, " +
                "@pageSize", 
                new SqlParameter("@search", search), 
                new SqlParameter("@filter", filter),
                new SqlParameter("@currentPage", currentPage),
                new SqlParameter("@pageSize", pageSize)).ToListAsync();

            var homeViewModel = new HomeViewModel<Order>
            {
                Items = orders,
                Pagination = new PageViewModel
                {
                    CurrentPage = currentPage,
                    PageSize = pageSize
                }
            };

            return Ok(homeViewModel);
        }

        [HttpGet("{id}")]
        public async Task<OrderViewModel> Get(int id)
        {
            var order = await _database.Orders.FromSql("dbo.GET_ORDER @id", new SqlParameter("@id", id)).FirstAsync();
            var photos = _database.Photos.FromSql("dbo.GET_ORDER_PHOTOS @id", new SqlParameter("@id", id));
            var listPhotos = await photos.FirstOrDefaultAsync(p => p.Id == 0) != null ? new List<Photo>() : await photos.ToListAsync();

            var orderViewModel = new OrderViewModel
            {
                Order = order,
                Photos = listPhotos
            };

            return orderViewModel;
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

        [Authorize]
        [HttpPost("upload-images")]
        public async Task<IActionResult> UploadImages([FromForm] FileViewModel model)
        {
            string currentRootPath = _hostingEnvironment.ContentRootPath;
            string imagesPath = "/app/public/images/";

            foreach (var file in model.Files)
            {
                var photoId = Guid.NewGuid() + Path.GetExtension(file.FileName);
                using (var fileStream = new FileStream(currentRootPath + imagesPath + photoId, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                await _database.Database.ExecuteSqlCommandAsync("dbo.INSERT_ORDER_PHOTO @orderId, " +
                    "@fileName, " +
                    "@path",
                    new SqlParameter("@orderId", model.Id),
                    new SqlParameter("@fileName", file.FileName),
                    new SqlParameter("@path", "images/" + photoId));
            }

            return Ok();
        }
    }
}
