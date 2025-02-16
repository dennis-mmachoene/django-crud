import { useEffect, useMemo, useState } from "react";
import AxiosInstance from "./Axios";
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";

const Home = () => {

  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true)
   
  const GetData = () => {
    AxiosInstance.get(`project/`).then((res) => {
      setMyData(res.data)
      setLoading(false)
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "comments", //normal accessorKey
        header: "Comments",
        size: 200,
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
        size: 150,
      },
      {
        accessorKey: "end_date",
        header: "End Date",
        size: 150,
      },
    ],
    []
  );

  return (
    <div>
      {loading ? <p>Loading data...</p>:
      <MaterialReactTable columns={columns} data={myData} />
    }
    </div>
  );
};

export default Home;
