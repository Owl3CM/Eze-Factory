// import ItemsLoading from "./ItemsLoading";
// import Searching from "./Searching";
import Loading from "./Loading";
import Error from "./Error";
import Progressing from "./Progressing";
import NoContent from "./NoContent";

//! Todo handle for reloading for capacitor
// ScreenProvider.isBelowTablet();
const StateKit = {
  // error: null, // Error,
  error: Error, // Error,
  processing: Progressing,
  // searching: Searching,
  loading: Loading,
  // loadingMore: ItemsLoading,
  noContent: NoContent,
  empty: NoContent,
  reloading: Loading,
  // idle: null,
};
export default StateKit;

export type IState = "idle" | "loading" | "processing" | "reloading" | "searching" | "error" | "noContent" | "loadingMore";
// keyof typeof StateKit & string; //

export type ServiceState =
  | IState
  | { state: IState; props: any; parent?: HTMLElement | undefined }
  | {
      state: "noContent";
      props: {
        label: string;
      };
      parent?: HTMLElement | undefined;
    };
