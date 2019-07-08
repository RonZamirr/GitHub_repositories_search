using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitHub_repositories_search.Models
{
    public class UserRepository
    {
        public string id { get; set; }
        public string OwnerName { get; set; }
        public string RepositoryName { get; set; }

        public string RepositoryUrl { get; set; }

        public string OwnerAvatar { get; set; }
    }
}
