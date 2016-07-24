import {
    fromJS,
    Map,
    List
} from "immutable";

import {
    GET_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY,
    SELECT_FILTER
} from "../constants/ActionTypes";

const initialState = new Map();

const allProducts = fromJS({
    rootProductImageFolder: "/bellies/resources/img/categories",
    productsByID: {
        "bclt-001": {
            categories: ["bclt"],
            filters: ["filterPriceRange3", "filterStyleKnotted"],
            name: "Crimson Tide",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "25.99"
        },
        "bclt-002": {
            categories: ["bclt"],
            filters: ["filterPriceRange3", "filterStyleKnotted"],
            name: "Black Mamba",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "28.50"
        },
        "bclt-003": {
            categories: ["bclt"],
            filters: ["filterPriceRange2", "filterStyleKnotted"],
            name: "Littleton Spirit Bracelet",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "19.99"
        },
        "bclt-004": {
            categories: ["bclt"],
            filters: ["filterPriceRange4"],
            name: "Aqua Velvet",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "35.50"
        },
        "bclt-005": {
            categories: ["bclt"],
            filters: ["filterPriceRange2", "filterStyleKnotted"],
            name: "Pinky Tuscadero",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "19.99"
        },
        "bclt-006": {
            categories: ["bclt"],
            filters: ["filterPriceRange3"],
            name: "Frozen Teardrops",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "24.99"
        },
        "erng-001": {
            categories: ["erng"],
            filters: ["filterPriceRange2"],
            name: "Jade Palace",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "18.99"
        },
        "erng-002": {
            categories: ["erng"],
            filters: ["filterPriceRange2"],
            name: "Ice Afraidofya",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "17.99"
        },
        "erng-003": {
            categories: ["erng"],
            filters: ["filterPriceRange2", "filterStyleVintage"],
            name: "Brass Tacks",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "18.99"
        },
        "erng-004": {
            categories: ["erng"],
            filters: ["filterPriceRange3"],
            name: "Jade Quinperlamate",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "20.99"
        },
        "erng-005": {
            categories: ["erng"],
            filters: ["filterPriceRange3"],
            name: "Gold Vanity",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "21.99"
        },
        "erng-006": {
            categories: ["erng"],
            filters: ["filterPriceRange3"],
            name: "A Ruby Ran Through It",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "23.50"
        },
        "erng-007": {
            categories: ["erng"],
            filters: ["filterPriceRange3"],
            name: "Turquoise Medallions",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "28.99"
        },
        "erng-008": {
            categories: ["erng"],
            filters: ["filterPriceRange3"],
            name: "Pearly Gates",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "22.39"
        },
        "erng-009": {
            categories: ["erng"],
            filters: ["filterPriceRange3"],
            name: "Rock Steadies",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "29.99"
        },
        "nkl-001": {
            categories: ["nkl"],
            filters: ["filterPriceRange4"],
            name: "Purple People Eaters",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "55.99"
        },
        "nkl-002": {
            categories: ["nkl"],
            filters: ["filterPriceRange3"],
            name: "Eye of the Storm",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "32.99"
        },
        "nkl-003": {
            categories: ["nkl"],
            filters: ["filterPriceRange4"],
            name: "Tablet of Moses",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "45.99"
        },
        "nkl-004": {
            categories: ["nkl"],
            filters: ["filterPriceRange4"],
            name: "Dilithium Crystals",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "36.99"
        },
        "nkl-005": {
            categories: ["nkl"],
            filters: ["filterPriceRange4"],
            name: "Snake Eye",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "35.99"
        },
        "tsl-001": {
            categories: ["tsl"],
            filters: ["filterPriceRange4"],
            name: "Littleton Spirit Tassel",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "35.99"
        },
        "tsl-002": {
            categories: ["tsl"],
            filters: ["filterPriceRange3"],
            name: "Westford Spirit Tassel",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            price: "24.99"
        }
    }
});

function selectFilter(state, filterID, selected) {
    const filters = state.get("allFilters");
    console.log(state);

    let selectedFilters = state.get("selectedFilters");
    if (!selectedFilters) {
        if (selected) {
            selectedFilters = List.of(filterID);
        }
    } else {
        let filterIndex = selectedFilters.indexOf(filterID);
        if (selected && filterIndex == -1) {
            selectedFilters = selectedFilters.add(filterID);
        } else if (!selected && filterIndex > -1) {
            selectedFilters = selectedFilters.remove(filterIndex);
        }
    }

    return filterProductsBySelectedFilters(state.set("selectedFilters", selectedFilters));
}

function filterProductsBySelectedFilters(state) {
    const selectedFilters = state.get("selectedFilters");
    return state.set("list", allProducts.get("productsByID").filter((product) => {
        return product.get("filters").some(filterID => {
            return selectedFilters.contains(filterID);
        });
    }));
}

export default function products(state = initialState, action = {type: "NONE"}) {
    switch (action.type) {
        case GET_PRODUCTS :
            return state.set("list", allProducts.get("productsByID"));

        case GET_PRODUCTS_BY_CATEGORY :
            return state.set("list", allProducts.get("productsByID").filter((product) => {
                return product.get("categories").includes(action.categoryID)
            }));

        case SELECT_FILTER :
            return selectFilter(state, action.filterID, action.selected);
    }

    return state;
}


