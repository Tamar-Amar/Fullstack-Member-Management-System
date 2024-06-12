import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMembers, deleteMember} from "./Axios/memberAxios";
import { FillDataMember, DeleteMemberAction } from "../REDUX/actions";
import './HomeCss.css';
import './GeneralCss.css';


export const Home = () => {

  const [arr, setArr] = useState([])
  let dispatch=useDispatch()
  const navigate= useNavigate()


  //Fetch members list
  useEffect(() => {
    async function loadData() {
        let response = await getAllMembers()
        setArr(response.data)
        dispatch(FillDataMember(response.data))
    } loadData()
  },[])

  //Function to delete a member
  const handleDeleteMember = async (memberId) => {
    const confirmed = window.confirm("Are you sure you want to delete the member?");
    if (!confirmed) return;
    try {
      await deleteMember(memberId); 
      dispatch(DeleteMemberAction(memberId));
      //-- update the local state to reflect the change
      setArr(arr.filter((member) => member.MemberID !== memberId));

      alert("Member successfully deleted");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Error: Failed to delete friend");
    }
  };

  return (
    <div className="component">
      <button className="to-covid-report" onClick={() => navigate(`../details`)}>Covid Report</button>
      <br/>
      <button className="to-add-member" onClick={() => navigate(`../addMember`)}>Add new member</button>
      <br/>

      {arr.map(x=>
      <div className="one-member-row" key={x.MemberID}>
        <label className="member-name">{x.lastName} {x.firstName}</label> 
        <button className="btn-mem" onClick={() => navigate(`../memberDetails/${x.MemberID}`)}>
              Details </button>          
        <button className="btn-mem" onClick={() => navigate(`../addMember`,{state: {memberData: x.MemberID,},})}>
              Edit </button>           
        <button className="btn-mem del" onClick={() => handleDeleteMember(x.MemberID)}>
              Delete </button>

      </div>)}
</div>
  );
};
