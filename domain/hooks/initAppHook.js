import { isLoadingContext } from "../contexts/loadingContext";
import { END_POINTS } from "../utils/endpoints";
import { useBoard } from "./boardHook";
import { useLoading } from "./loadingHook";

export default function useInitApp() {
  const { setLoading } = useLoading();
  const {} = useBoard();

  function getFirstBoard() {
    return END_POINTS.Board.Get.getFirstBoard(
      null,
      () => lsetLoading(true, "Getting board data..."),
      () => lsetLoading(false),
    );
  }

  function createBoard() {
    END_POINTS.Board.Post.createBoard(
      { name: "secondApp" },
      () => lsetLoading(true, "Creating board..."),
      () => lsetLoading(false),
    );
  }

  async function getBoardData() {
    try {
      return await getFirstBoard();
    } catch (error) {
      if (erorr instanceof Response && error.status === 404) {
        return await createBoard();
      }
      //if it errored but the error is not 404 if its something else like badgateaway it will return undefined and then we want to terminte the app
    }
  }

  async function init() {
    console.log("initting  app");
    let boardData = await getBoardData();
    if (!boardData || !boardData["columns"]) {
      throw new Error("Application init failed, terminated");
    }

    setColumnsData(boardData["columns"]);
    console.log("app init completed")
  }

  return {
    init,
  };
}
