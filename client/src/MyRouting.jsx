import {Route,Routes} from "react-router-dom";
import { MemberDetails } from "./components/MemberDetails";
import { AddMember } from "./components/AddMember";
import {Home} from "./components/Home";
import { Details } from "./components/Details";


export const MyRouting=()=>{
    return <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/memberDetails/:MemberID" element={<MemberDetails/>}></Route>
        <Route path="/addMember" element={<AddMember/>}></Route>
        <Route path="/details" element={<Details/>}></Route>
    </Routes>
}