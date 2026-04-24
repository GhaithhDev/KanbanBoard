import { useContext } from "react";
import { FetchRequestTypes } from "../enums/fetchRequestTypes";
import useAuth from "./authHook";
import { useLoading } from "./loadingHook";
import { AuthContext } from "../contexts/authContext";

type apiRequestUsage = {
  sendApiRequest: (
    endPoint: string,
    requestType: FetchRequestTypes,
    requestData: any,
    loadingMeassage: string,
    onStart: () => void,
    onEnd: () => void,
  ) => Promise<any>;
};

const SERVER_URL = "http://172.20.10.3:3000";

export function useApiRequest() {
  const { setLoading } = useLoading();
  const { token } = useContext(AuthContext);

  async function sendApiRequest(
    endPoint: string,
    requestType: FetchRequestTypes,
    requestData: any,
    loadingMeassage: string,
    onStart?: () => void,
    onEnd?: () => void,
  ): Promise<any> {
    try {
      setLoading(true, loadingMeassage);
      if (onStart) {
        onStart();
      }
      const result = await fetch(SERVER_URL + endPoint, {
        method: requestType,
        headers: {
          "Content-Type": "application/json",
         ...(token && {"Authorization": `Bearer ${token}`}),
        },
        body: requestData && JSON.stringify(requestData),
      });
      //where do I put the token (backend is looking for it as a bearer toekn)
      if (
        result.status === 204 ||
        result.headers.get("content-length") === "0"
      ) {
        return null;
      }
      const contentType = result.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        return result.text();
      }

      const data = await result.json();

      if (!result.ok) {
        throw data;
      }

      return data;
    } catch (error) {
      throw error;
    } finally {
      if (onEnd) {
        onEnd();
      }
      setLoading(false, "");
    }
  }

  return {
    sendApiRequest,
  } satisfies apiRequestUsage;
}
