using Newtonsoft.Json;
using KendoDreamCarShopper.Models;

namespace KendoDreamCarShopper.ViewModels.Maintenance {

    // Identical to Make model class except "Models" navigation property.
    public class MakeViewModel {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }

        public static MakeViewModel FromModel(Make make) {
            return new MakeViewModel {
                Id = make.Id,
                Name = make.Name,
                Location = make.Location,
                ImageUrl = make.ImageUrl
            };
        }
    }
}
