import Loading from "./Kit/Loading";
import Error from "./Kit/Error";
import Progressing from "./Kit/Progressing";
import NoContent from "./Kit/NoContent";
// import ItemsLoading from "./Kit/ItemsLoading";
// import Searching from "./Kit/Searching";
// import EmptyBill from "./Kit/EmptyBill";

export const DefaultStatusKit = {
  error: Error,
  processing: Progressing,
  loading: Loading,
  noContent: NoContent,
  empty: NoContent,
  reloading: Loading,
};
