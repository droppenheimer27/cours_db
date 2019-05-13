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
    public class ExecutorsController : ControllerBase
    {
        private readonly ApplicationContext _database;

        public ExecutorsController()
        {
            _database = new ApplicationContext();
        }

        [HttpGet]
        public IEnumerable<Executor> Get(string search = "", string filter = "")
        {
            var executors = _database.Executors.FromSql("dbo.GET_EXECUTORS @search, @filter", 
                new SqlParameter("@search", search), 
                new SqlParameter("@filter", filter));
            return executors;
        }

        [HttpGet("{id}")]
        public async Task<Executor> Get(int id)
        {
            var executor = await _database.Executors.FromSql("dbo.GET_EXECUTOR @id", new SqlParameter("@id", id)).FirstAsync();
            return executor;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post(ExecutorViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.INSERT_EXECUTOR @firstName, " +
                    "@lastName, " +
                    "@patronymic, " +
                    "@description, " +
                    "@executorType, " +
                    "@userId, " +
                    "@phoneNumber, " +
                    "@payerAccountNumber, " +
                    "@fullJuridicalName, " +
                    "@shortJuridicalName, " +
                    "@servicesId", 
                    new SqlParameter("@firstName", model.FirstName),
                    new SqlParameter("@lastName", model.LastName),
                    new SqlParameter("@patronymic", model.Patronymic),
                    new SqlParameter("@description", model.Description),
                    new SqlParameter("@executorType", model.ExecutorType),
                    new SqlParameter("@userId", model.UserId),
                    new SqlParameter("@phoneNumber", model.Number),
                    new SqlParameter("@payerAccountNumber", model.PayerAccountNumber),
                    new SqlParameter("@fullJuridicalName", model.FullJuridicalName),
                    new SqlParameter("@shortJuridicalName", model.ShortJuridicalName),
                    new SqlParameter("@servicesId", model.ServicesId));

                return Ok(model);
            }

            return BadRequest();
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Put(EditExecutorViewModel model)
        {
            if (ModelState.IsValid)
            {
                await _database.Database.ExecuteSqlCommandAsync("dbo.UPDATE_EXECUTOR @id, " +
                    "@firstName, " +
                    "@lastName, " +
                    "@patronymic, " +
                    "@description, " +
                    "@executorType, " +
                    "@phoneNumber, " +
                    "@payerAccountNumber, " +
                    "@fullJuridicalName, " +
                    "@shortJuridicalName, " +
                    "@servicesId",
                    new SqlParameter("@id", model.Id),
                    new SqlParameter("@firstName", model.FirstName),
                    new SqlParameter("@lastName", model.LastName),
                    new SqlParameter("@patronymic", model.Patronymic),
                    new SqlParameter("@description", model.Description),
                    new SqlParameter("@executorType", model.ExecutorType),
                    new SqlParameter("@phoneNumber", model.Number),
                    new SqlParameter("@payerAccountNumber", model.PayerAccountNumber),
                    new SqlParameter("@fullJuridicalName", model.FullJuridicalName),
                    new SqlParameter("@shortJuridicalName", model.ShortJuridicalName),
                    new SqlParameter("@servicesId", model.ServicesId));

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
                await _database.Database.ExecuteSqlCommandAsync("dbo.DELETE_EXECUTOR @id",
                    new SqlParameter("@id", id));

                return Ok(id);
            }

            return BadRequest();
        }
    }
}
