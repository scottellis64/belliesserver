import {fromJS, Map} from "immutable";
import {
    GET_FILTERS,
    GET_FILTER_BY_ID,
    SELECT_FILTER
} from "../constants/ActionTypes";

const initialState = new Map();

var var1 = [{
    label: "Bracelet Type",
    types: ["Wrap"]
}, {
    label: "Necklace type",
    types: ["choker", "chained", "lariat"]
}, {
    label: "earring type",
    types: ["hoop", "dangle"]
}];

const allFilters = fromJS({
    filtersByID: {
        filterMaterialGold: {label: "Gold"},
        filterMaterialSilver: {label: "Silver"},
        filterMaterialGlass: {label: "Glass"},
        filterMaterialGS: {label: "Gem Stone"},
        filterMaterialRG: {label: "Rose Gold"},
        filterMaterialAG: {label: "Antique Gold"},
        filterMaterialAS: {label: "Antique Silver"},
        filterMaterialBrass: {label: "Brass"},
        filterMaterialLC: {label: "Leather Chording"},
        filterPriceRange1: {label: "$5 to $9.99"},
        filterPriceRange2: {label: "$10 to $19.99"},
        filterPriceRange3: {label: "$20 to $29.99"},
        filterPriceRange4: {label: "$30 >"},
        filterStyleKnotted: {label: "Knotted"},
        filterStyleVintage: {label: "Vintage"},
        filterStyleMacrame: {label: "Macrame"}
    },

    filterTypes: {
        filterTypeMaterial: {
            label: "Material",
            items: ["filterMaterialGold", "filterMaterialSilver", "filterMaterialGlass", "filterMaterialGS", "filterMaterialRG",
                "filterMaterialAG", "filterMaterialAS", "filterMaterialBrass", "filterMaterialLC"]
        },
        filterTypePrice: {
            label: "Price",
            items: ["filterPriceRange1", "filterPriceRange2", "filterPriceRange3", "filterPriceRange4"]
        },
        filterTypeStyle: {
            label: "Style",
            items: ["filterStyleKnotted", "filterStyleVintage", "filterStyleMacrame"]

        }
    }
});

function getFilterByID(id) {
    return allFilters.getIn(["filtersByID", id]);
}

//
// Gets the complete set of filters organized by type
//
function getAllFilters() {
    return allFilters.get("filterTypes").map(brand => {
        let filterGroup = {
            name: brand.get("label"),
            items: {}
        };

        brand.get("items").forEach(filterID => {
            const filter = getFilterByID(filterID);

            filterGroup.items[filterID] = {
                id: filterID,
                name: filter.get("label")
            }
        });

        return filterGroup;
    });
}

export default function filters(state = initialState, action = {type: "NONE"}) {
    switch (action.type) {
        case GET_FILTERS :
            return state.set("allFilters", getAllFilters());

        case GET_FILTER_BY_ID :
            return state.set("filter", getFilterByID(action.id));
    }

    return state;
}
