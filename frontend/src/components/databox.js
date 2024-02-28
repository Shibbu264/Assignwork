import BarChart from "@/components/barchart";
import PieChart from "@/components/piechart";
import { useEffect, useState } from "react";


export default function Databox (filtername){
    const [pieData, setPieData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/getpiedata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter:filtername.filtername
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPieData(data);
          setLoading(false);
        })
        .catch((error) => {console.error('Error fetching data:', error)
        setLoading(false);}
        );
      }, []);
      

return(
    <div className="border-x w-[80%] border-y">
    <h2 className="text-center font-semibold text-4xl my-[5%]">Distribution Based on {filtername.filtername}</h2>
    <div className="  py-4 px-2 flex gap-[5%] justify-center">
    {loading ? (
          <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div> 
        ) : (<>
    {pieData && <PieChart data={pieData} />}
    {pieData && <BarChart data={pieData}/>}
    </>)}
    </div>
    </div>
)

}