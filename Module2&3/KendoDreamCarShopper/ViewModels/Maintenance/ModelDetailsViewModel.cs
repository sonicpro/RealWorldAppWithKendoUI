using System.Collections.Generic;
using System.Linq;
using KendoDreamCarShopper.Models;
using KendoDreamCarShopper.ViewModels.Common;
using Newtonsoft.Json;

namespace KendoDreamCarShopper.ViewModels.Maintenance {

    public class ModelDetailsViewModel {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("makeId")]
        public int? MakeId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("year")]
        public int Year { get; set; }

        [JsonProperty("basePrice")]
        public decimal BasePrice { get; set; }

        [JsonProperty("engineType")]
        public string EngineType { get; set; }

        [JsonProperty("breakHorsepower")]
        public int BreakHorsepower { get; set; }

        [JsonProperty("zeroToSixty")]
        public decimal ZeroToSixty { get; set; }

        [JsonProperty("topSpeed")]
        public int TopSpeed { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("images")]
        public IList<ModelImageViewModel> Images { get; set; }

        [JsonProperty("makes")]
        public IList<LookupItemViewModel> Makes { get; set; }

        [JsonProperty("makeName")]
        public string MakeName { get; set; }

        [JsonProperty("makeImageUrl")]
        public string MakeImageUrl { get; set; }

        public static ModelDetailsViewModel FromModel(Model model) {
            if (model == null) return new ModelDetailsViewModel{Images = new List<ModelImageViewModel>()};
            return new ModelDetailsViewModel {
                Id = model.Id,
                MakeId = model.MakeId,
                Name = model.Name,
                Year = model.Year,
                BasePrice = model.BasePrice,
                EngineType = model.EngineType,
                ZeroToSixty = model.ZeroToSixty,
                BreakHorsepower = model.BreakHorsepower,
                TopSpeed = model.TopSpeed,
                Description = model.Description,
                Images = model.Images.Select(x => ModelImageViewModel.FromModel(x)).ToList(),
                MakeName = model.Make.Name,
                MakeImageUrl = model.Make.ImageUrl
            };
        }

        public static Model ToModel(ModelDetailsViewModel viewModel) {
            return new Model
            {
                Id = viewModel.Id,
                MakeId = viewModel.MakeId.HasValue? viewModel.MakeId.Value:0,
                Name = viewModel.Name,
                Year = viewModel.Year,
                BasePrice = viewModel.BasePrice,
                EngineType = viewModel.EngineType,
                ZeroToSixty = viewModel.ZeroToSixty,
                BreakHorsepower = viewModel.BreakHorsepower,
                TopSpeed = viewModel.TopSpeed,
                Description = viewModel.Description
            };
        }
    }
}
