using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Formatting;
using GitHub_repositories_search.Models;
namespace GitHub_repositories_search.Controllers
{
    [Route("api/[controller]")]
    //public class SampleDataController : Controller
    public class RepositoriesSearch : Controller
    {

        // POST: api/RepositoriesSearch/GetBookmaredRepositoryIdsFromSession
        //--------------------------------------------------------------------------------
        [HttpGet("[action]")]
        public dynamic GetBookmaredRepositoryIdsFromSession()
        {
            var keys = HttpContext.Session.Keys.ToList();
           
                return keys;
        }
        // POST: api/RepositoriesSearch/GetBookmaredRepositoryIdsFromSession
        //--------------------------------------------------------------------------------
        [HttpGet("[action]")]
        public dynamic GetBookmaredRepositoryFromSession()
        {
            List <string> BookmaredRepository = new List<string>();
         //   var res = HttpContext.Session.Keys.ToList().ForEach(Repository_key => );
            foreach (string key in HttpContext.Session.Keys)
            {
                BookmaredRepository.Add(HttpContext.Session.GetString(key));
            }
                return BookmaredRepository;
        }
        //--------------------------------------------------------------------------------
        // POST: api/RepositoriesSearch/BookmarkRepository
        [HttpPost]
        [Route("BookmarkRepository")]

        public void BookmarkRepository([FromBody]UserRepository user_repository)
        {
            try
            {
                HttpContext.Session.SetString(user_repository.id,
                    user_repository.id +
                    " " + user_repository.OwnerAvatar + " " + user_repository.OwnerName + "" +
                    " " + user_repository.RepositoryName + " " + user_repository.RepositoryUrl);

              

            }
            catch
            {

            }
        }
        //-------------------------------------------------------------------

        // delete: api/RepositoriesSearch/BookmarkRepository
        [HttpDelete]
        [Route("BookmarkRepository")]

        public void UnBookmarkRepository([FromBody]UserRepository user_repository)
        {
            try
            {
           
                HttpContext.Session.Remove(user_repository.id);

              

            }
            catch
            {
               
            }
        }
        //--------------------------------------------------------------------------------

    }
}
