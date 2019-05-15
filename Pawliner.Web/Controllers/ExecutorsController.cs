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
using System.Threading.Tasks;

namespace Pawliner.Web.Controllers
{
    [Route("api/{controller}")]
    [ApiController]
    public class ExecutorsController : ControllerBase
    {
        private readonly ApplicationContext _database;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ExecutorsController(IHostingEnvironment hostingEnvironment)
        {
            _database = new ApplicationContext();
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string search = "", string filter = "", int currentPage = 1, int pageSize = 3)
        {
            var executors = await _database.Executors.FromSql("dbo.GET_EXECUTORS @search, " +
                "@filter, " +
                "@currentPage, " +
                "@pageSize",
                new SqlParameter("@search", search),
                new SqlParameter("@filter", filter),
                new SqlParameter("@currentPage", currentPage),
                new SqlParameter("@pageSize", pageSize)).ToListAsync();

            var homeViewModel = new HomeViewModel<Executor>
            {
                Items = executors,
                Pagination = new PageViewModel
                {
                    CurrentPage = currentPage,
                    PageSize = pageSize
                }
            };

            return Ok(homeViewModel);
        }

        [HttpGet("{id}")]
        public async Task<ExecutorPhotosViewModel> Get(int id)
        {
            var executor = await _database.Executors.FromSql("dbo.GET_EXECUTOR @id", new SqlParameter("@id", id)).FirstAsync();
            var photos = _database.Photos.FromSql("dbo.GET_EXECUTOR_PHOTOS @id", new SqlParameter("@id", id));
            var listPhotos = await photos.FirstOrDefaultAsync(p => p.Id == 0) != null ? new List<Photo>() : await photos.ToListAsync();

            var executorViewModel = new ExecutorPhotosViewModel
            {
                Executor = executor,
                Photos = listPhotos
            };

            return executorViewModel;
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

        [Authorize]
        [HttpPost("upload-images")]
        public async Task<IActionResult> UploadImages([FromForm] FileViewModel model)
        {
            string currentRootPath = _hostingEnvironment.ContentRootPath;
            string imagesPath = "/app/public/images/";

            foreach (var file in model.Files)
            {
                var photoId = Guid.NewGuid() + System.IO.Path.GetExtension(file.FileName);
                using (var fileStream = new System.IO.FileStream(currentRootPath + imagesPath + photoId, System.IO.FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                await _database.Database.ExecuteSqlCommandAsync("dbo.INSERT_EXECUTOR_PHOTO @executorId, " +
                    "@fileName, " +
                    "@path",
                    new SqlParameter("@executorId", model.Id),
                    new SqlParameter("@fileName", file.FileName),
                    new SqlParameter("@path", "images/" + photoId));
            }

            return Ok();
        }
    }
}
