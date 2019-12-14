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
    if (queryParams !== "") {
      axios
        .get(`/api/search?${queryParams}`, {
          cancelToken: new CancelToken(e => {
            cancel = e;
          })
        })
        .then(res => {
          if (res.status === 200 && res.data.status === "success") {
            resolve({
              status: "success",
              players: [...res.data.data],
              count: res.data.total,
              per_pag: res.data.pagination.per_page,
              current_page: res.data.pagination.current_page,
              total_pages: res.data.pagination.total_pages
            });
          } else {
            reject({ status: "fail" });
          }
        })
        .catch(error => {
          reject({ status: "fail", body: error });
        });
    }
  });
};
