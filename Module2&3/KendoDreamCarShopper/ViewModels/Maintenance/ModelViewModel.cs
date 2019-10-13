using KendoDreamCarShopper.Models;
using Newtonsoft.Json;

namespace KendoDreamCarShopper.ViewModels.Maintenance {

    public class ModelViewModel {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("year")]
        public int Year { get; set; }

        [JsonProperty("basePrice")]
        public decimal BasePrice { get; set; }

        [JsonProperty("makeId")]
        public long MakeId { get; set; }

        [JsonProperty("makeName")]
        public string MakeName { get; set; }

        public static ModelViewModel FromModel(Model model) {
            return new ModelViewModel {
                Id = model.Id,
                Name = model.Name,
                Year = model.Year,
                BasePrice = model.BasePrice,
                MakeId = model.MakeId,
                MakeName = model.Make.Name
            };
        }
    }
}