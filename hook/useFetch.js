import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resp, setResp] = useState({});

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": "64831b5c74mshb0c77a4ba1b0793p12dbb0jsn8dfa39230b01",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setResp(response);
      setData(response?.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, resp, refetchData };
};

export default useFetch;
