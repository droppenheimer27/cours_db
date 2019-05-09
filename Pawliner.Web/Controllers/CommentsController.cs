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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(CommentViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.INSERT_COMMENT @content, @userId, @executorId",
                    new SqlParameter("@content", model.Content),
                    new SqlParameter("@userId", model.UserId),
                    new SqlParameter("@executorId", model.ExecutorId));

                return Ok(model);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(EditCommentViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.UPDATE_COMMENT @id, @content",
                    new SqlParameter("@id", model.Id),
                    new SqlParameter("@content", model.Content));

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
                await _database.Database.ExecuteSqlCommandAsync("dbo.DELETE_COMMENT @id",
                    new SqlParameter("@id", id));

                return Ok(id);
            }

            return BadRequest();
        }
    }
}
