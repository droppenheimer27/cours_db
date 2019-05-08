using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pawliner.DataProvider.Context;
using Pawliner.DataProvider.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Pawliner.Web.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class RespondsController : ControllerBase
    {
        private readonly ApplicationContext _database;

        public RespondsController()
        {
            _database = new ApplicationContext();
        }

        [HttpGet("{id}")]
        public IEnumerable<Respond> Get(int id)
        {
            var responds = _database.Responds.FromSql("dbo.GET_RESPONDS @id", new SqlParameter("@id", id));

            return responds;
        }
    }
}
