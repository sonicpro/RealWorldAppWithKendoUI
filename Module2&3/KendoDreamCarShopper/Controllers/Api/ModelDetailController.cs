using System.Linq;
using KendoDreamCarShopper.ViewModels.Maintenance;

namespace KendoDreamCarShopper.Controllers.Api
{
    public class ModelDetailController : ApiControllerBase
    {
        // GET api/<controller>/5
        public ModelDetailsViewModel Get(int id)
        {
            return ModelDetailsViewModel.FromModel(EntityStore.Models.Include("Images").Include("Make")
                .FirstOrDefault(x => x.Id == id));
        }
    }
}