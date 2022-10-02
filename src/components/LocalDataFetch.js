import React,{useEffect,useState} from "react";
import axios from "axios";
// import { JSON } from "sequelize";

function LocalDataFetch() {
  const [data, setData] = useState({ hits: [] });
//   const [query, setQuery] = useState("redux");

  useEffect(() => {
    axios.get('http://localhost:8080/api').then((response) => {
        // console.log(response);
        // console.log(response.data.message)
        setData(response.data)
      });
  }, []);
  return <div>
    <h1>{JSON.stringify({data})}</h1>
    LocalDataFetch
    </div>;
}

export default LocalDataFetch;
