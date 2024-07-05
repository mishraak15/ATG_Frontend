import axios from "axios";
import toast from "react-hot-toast";
const url = process.env.REACT_APP_BACKEND_URL;

export function fetchJobs(setPosts, setLoading, category = "all") {
  axios
    .get(`${url}/fetchJobs/${category}`, { withCredentials: true })
    .then((res) => {
      if (res?.data?.msg === "OK") {
        setPosts(res?.data?.jobs);
        setLoading(false);
      }
    })
    .catch((err) => {
      toast.remove();
      console.log(err?.response?.data);
      let errMsg = err?.response?.data?.message || "Something went Wrong!!";
      toast.error(errMsg);
    });
}
