import Databox from "@/components/databox";
import Searchbar from "@/components/searchbar";



export default function Home1 (){
   

return(
    <div className="flex items-center flex-col gap-y-12 my-16">
        <Searchbar/>
       <Databox filtername="intensity"/>
       <Databox filtername="country"/>
       <Databox filtername="pestle"/>
       <Databox filtername="start_year"/>
       <Databox filtername="end_year"/>
       <Databox filtername="relevance"/>
       <Databox filtername="region"/>
  </div>
)










}