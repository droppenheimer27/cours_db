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
    public class ExecutorsController
    {
        private readonly ApplicationContext _database;

        public ExecutorsController()
        {
            _database = new ApplicationContext();
        }

        [HttpGet]
        public IEnumerable<Executor> Get(string search = "", string filter = "")
        {
            var executors = _database.Executors.FromSql("dbo.GET_EXECUTORS @search, @filter", new SqlParameter("@search", search), new SqlParameter("@filter", filter));
            return executors;
        }

        [HttpGet("{id}")]
        public async Task<Executor> Get(int id)
        {
            var executor = await _database.Executors.FromSql("dbo.GET_EXECUTOR @id", new SqlParameter("@id", id)).FirstAsync();
            return executor;
        }
    }
}
