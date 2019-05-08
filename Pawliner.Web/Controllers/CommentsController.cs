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
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationContext _database;

        public CommentsController()
        {
            _database = new ApplicationContext();
        }

        [HttpGet("{id}")]
        public IEnumerable<Comment> Get(int id)
        {
            var comments = _database.Comments.FromSql("dbo.GET_COMMENTS @id", new SqlParameter("@id", id));
            return comments;
        }
    }
}
