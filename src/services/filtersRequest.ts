import axios from "axios";

const CancelToken = axios.CancelToken;
let cancel: any;

/**
 * Get filters request
 * @param {array} params
 * @return {element}
 **/
export const filtersRequest = (): any => {
  cancel && cancel();

  return new Promise((resolve, reject): void => {
    axios
      .get(`http://localhost:8000/filters`, {
        cancelToken: new CancelToken(e => {
          cancel = e;
        })
      })
      .then(res => {
        if (res.status === 200) {
          resolve({
            status: "success",
            filters: [...res.data]
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
