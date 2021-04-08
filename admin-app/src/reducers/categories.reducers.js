import { Switch } from "react-router";
import { Category, CreateCategory } from "../actions/constants";
let initState = {
  error: null,
  Categories: [],
  loading: false,
};
function buildNewCategory(categories, category) {
  let myCategories = [];
  for (let cate of categories) {
    myCategories.push({
      ...cate,
      children:
        cate.children && cate.childres.length > 0
          ? buildNewCategory(cate.children, category)
          : null,
    });
  }
  return myCategories;
}
export default (state = initState, action) => {
  switch (action.type) {
    case Category.CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case Category.CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        Categories: action.payload.category,
      };
      break;
    case Category.CATEGORY_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      };
      break;
    case Category.CATEGORY_ADD:
      state = {
        ...state,
        loading: true,
      };
      break;
    case Category.CATEGORY_ADDSUCCESS:
      const upLO = buildNewCategory(state.Categories, action.payload.category);
      state = {
        ...state,
        loading: false,
        Categories: upLO,
      };
      break;
    case Category.CATEGORY_ADDFAILURE:
      state = {
        ...state,
        loading: false,
        Categories: action.payload.error,
      };
      break;
  }
  console.log(state);
  return state;
};
