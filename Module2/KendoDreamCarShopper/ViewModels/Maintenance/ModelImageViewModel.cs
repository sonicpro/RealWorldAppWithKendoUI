using KendoDreamCarShopper.Models;
using Newtonsoft.Json;

namespace KendoDreamCarShopper.ViewModels.Maintenance {

    public class ModelImageViewModel {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("highResolutionUrl")]
        public string HighResolutionUrl { get; set; }

        [JsonProperty("lowResolutionUrl")]
        public string LowResolutionUrl { get; set; }

        [JsonProperty("order")]
        public int Order { get; set; }

        [JsonProperty("shortDescription")]
        public string ShortDescription { get; set; }

        // This property is set directly in ModelsController.HandleImages().
        // No need to pass it to the client.
        [JsonIgnore]
        public int ModelId { get; set; }

        public static ModelImageViewModel FromModel(ModelImage model) {
            return new ModelImageViewModel {
                Id = model.Id,
                HighResolutionUrl = model.HighResolutionUrl,
                LowResolutionUrl = model.LowResolutionUrl,
                Order = model.Order,
                ShortDescription = model.ShortDescription
            };
        }

        public static ModelImage ToModel(ModelImageViewModel viewModel) {
            return new ModelImage {
                Id = viewModel.Id,
                HighResolutionUrl = viewModel.HighResolutionUrl,
                LowResolutionUrl = viewModel.LowResolutionUrl,
                Order = viewModel.Order,
                ShortDescription = viewModel.ShortDescription,
                LongDescription = viewModel.ShortDescription,
                ModelId = viewModel.ModelId
            };
        }
    }
}
