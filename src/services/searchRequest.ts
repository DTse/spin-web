import axios from "axios";
import queryString from "query-string";

const CancelToken = axios.CancelToken;
let cancel: any;

/**
 * Search request
 * @param {array} params
 * @return {element}
 **/
export const searchRequest = (params: any): any => {
  cancel && cancel();

  return new Promise((resolve, reject): void => {
    const queryParams = queryString.stringify(
      { ...params },
      { arrayFormat: "index" }
    );

    axios
      .get(`http://localhost:8000/search?${queryParams}`, {
        cancelToken: new CancelToken(e => {
          cancel = e;
        })
      })
      .then(res => {
        if (res.status === 200) {
          resolve({
            status: "success",
            entries: [...res.data.data],
            pagination: { ...res.data.pagination }
          });
        } else {
          reject({ status: "fail" });
        }
      })
      .catch(error => {
        reject({ status: "fail", body: error });
      });
  });
};
