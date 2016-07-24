import {fromJS, Map} from "immutable";
import {
    GET_CATEGORIES,
    GET_CATEGORY_BY_ID
} from "../constants/ActionTypes";

const initialState = new Map();

const allCategories = fromJS({
    rootImageFolder: "/bellies/resources/img/categories",
    categoriesByID: {
        "bclt": {
            parents: null,
            name: "Bracelets",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva."
        },
        "nkl": {
            parents: null,
            name: "Necklaces",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva."
        },
        "erng": {
            parents: null,
            name: "Earrings",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva."
        },
        "tsl": {
            parents: null,
            name: "Tassels",
            shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin erat nec ornarevolu tpat. Etiam ut felis nec nisl eleifend lobortis. Aenean nibh est, hendrerit non conva."
        }
    }
});

export default function categories(state = initialState, action = {type: "NONE"}) {
    switch (action.type) {
        case GET_CATEGORIES :
            return state.set("allCategories", fromJS({
                imageFolder: allCategories.get("rootImageFolder"),
                categories: allCategories.get("categoriesByID").map((obj, id) => {
                    return {
                        id,
                        name: obj.get("name"),
                        shortDesc: obj.get("shortDesc"),
                        description: obj.get("description")
                    };
                })
            }));

        case GET_CATEGORY_BY_ID :
            return state.set("category", allCategories.getIn(["categoriesByID", action.id]))
    }

    return state;
}


