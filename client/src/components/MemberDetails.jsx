import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './GeneralCss.css';
import './MemberDetailsCss.css';

export const MemberDetails = () => {
  const navigate= useNavigate()
  const memID_param = useParams().MemberID;
  const allMembers = useSelector((state) => state.allMembers_Store);
  const mem=allMembers.find((m) => (m.MemberID === memID_param))


return ( 
  <div className="component">
    <h2> Member details:</h2>
      <label><b>full name: </b>{mem.firstName} {mem.lastName}</label><br/>
      <label><b>ID:</b> {mem.MemberID}</label><br/>
      
      <label><b>birth date:</b> {new Date(mem.birthDate).toLocaleDateString()}</label><br/>
      <label><b>cellphone:</b> {mem.cellphone}</label><br/>
      {mem.telephone!==""&&<label><b>phone:</b> {mem.telephone}<br/></label>}
      {(mem.address.city&&mem.address.numBuild&&mem.address.street)&&(<div><label><b>address:</b> {mem.address.street+" "+mem.address.numBuild+", "+mem.address.city+"."}</label><br/><br/></div>)}

      {mem.dateOfRecovery&&<label><b>recovery date:</b> {new Date(mem.dateOfRecovery).toLocaleDateString()}<br/></label>}
      {mem.positiveResult&&<label><b>positive test date:</b> {new Date(mem.positiveResult).toLocaleDateString()}<br/></label>}
      <br/>

      {mem.vaccinations.length>0&&<table> 
        <thead> 
          <tr><th>Manufacturer:</th><th>Date:</th></tr>
        </thead> 
        <tbody>{mem.vaccinations.map((x) => ( 
          <tr key={x._id}> 
            <td><label>{x.manufacturer}</label></td> 
            <td><label>{new Date(x.vaccinatedDate).toLocaleDateString()}</label></td> 
          </tr>))} 
        </tbody>
      </table>}

  <br/>
      <button className="edit-btn" onClick={() => navigate(`../addMember`,{state: {memberData: mem.MemberID,},})}>
               Edit </button>       
      
      <button className="home-btn" onClick={() => navigate(`../`)}>
               Home </button> 

  </div>
  );
};


