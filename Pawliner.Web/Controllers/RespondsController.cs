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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(RespondViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.INSERT_RESPOND @content, @orderId, @executorId",
                    new SqlParameter("@content", model.Content),
                    new SqlParameter("@executorId", model.ExecutorId),
                    new SqlParameter("@orderId", model.OrderId));

                return Ok(model);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(EditRespondViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.UPDATE_RESPOND @id, @content, @status",
                    new SqlParameter("@id", model.Id),
                    new SqlParameter("@content", model.Content),
                    new SqlParameter("@status", model.Status));

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
                await _database.Database.ExecuteSqlCommandAsync("dbo.DELETE_RESPOND @id",
                    new SqlParameter("@id", id));

                return Ok(id);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut("submit-respond")]
        public async Task<IActionResult> SubmitRespond(SubmitRespondViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.SUBMIT_RESPOND @id",
                    new SqlParameter("@id", model.Id));

                return Ok(model);
            }

            return BadRequest();
        }
    }
}
