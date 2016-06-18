using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using UniRitter.UniRitter2016.Models;

namespace UniRitter.UniRitter2016.Controllers
{
    public class HealthCheckController : ApiController
    {
        public IHttpActionResult Get()
        {
            return Json<HealthCheck>(new HealthCheck { status = HealthStatus.green });
        }
    }
}
