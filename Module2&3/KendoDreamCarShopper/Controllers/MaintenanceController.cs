using System.Web.Mvc;

namespace KendoDreamCarShopper.Controllers {

    [Authorize(Roles = "Admin")]
    public class MaintenanceController : ControllerBase {

        public ActionResult Makes()
        {
            return View();
        }

        public ActionResult Models()
        {
            return View();
        }

        public ActionResult ModelDetails()
        {
            return View();
        }
    }
}
