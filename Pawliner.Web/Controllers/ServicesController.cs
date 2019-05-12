using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pawliner.DataProvider.Context;
using Pawliner.DataProvider.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pawliner.Web.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly ApplicationContext _database;

        public ServicesController()
        {
            _database = new ApplicationContext();
        }

        [HttpGet]
        public async Task<IEnumerable<Service>> Get()
        {
            var services = await _database.Services.FromSql("dbo.GET_SERVICES").ToArrayAsync();
            return services;
        }
    }
}
