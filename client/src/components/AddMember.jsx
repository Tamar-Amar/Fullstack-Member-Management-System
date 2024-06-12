
import { useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { FillDataMember, EditMemberAction, AddMemberToRedux } from "../REDUX/actions";
import { useNavigate } from "react-router-dom";
import { addMember, editMember } from "./Axios/memberAxios";
import { useLocation } from "react-router-dom";
import './GeneralCss.css';
import './AddMemberCss.css';
import { useSelector } from "react-redux";




export const AddMember = () => {
    
    const [VaccinationsArr, setVaccinationsArr]=useState([{manufacturer:"", vaccinatedDate:""}])

    const [newMember, setNewMember] = useState({
        firstName: "",
        lastName: "",
        MemberID: "",
        birthDate: "",
        telephone: "",
        cellphone: "",
        address:{street:"",numBuild:"", city:""}
        // Optional fields:
        // positiveResult: "",
        // dateOfRecovery: "",
        // Vaccinations:{manufactorer:"",vaccinatedDate:""}
        //memPhoto: "", 
    });

    const { state } = useLocation();
    const memberData = state?.memberData;
    // Photo state (commented out for now)
    // const [photo, setPhoto] = useState(null); 

    // Redux dispatch and navigation
    let dispatch=useDispatch()
    let page=useNavigate(); 

    const allMembers = useSelector((state) => state.allMembers_Store);

    //Fetch member details if editing
    useEffect(() => {
        if (memberData) {
            setNewMember(allMembers.find((m) => (m.MemberID === memberData)));
            setVaccinationsArr((allMembers.find((m) => (m.MemberID === memberData))).vaccinations);
        }
      }, [memberData]);
      

    // Check if required fields are filled
    const isRequiredFieldsFilled = () => {
        const requiredFields = ["firstName", "lastName","MemberID", "cellphone","birthDate"];
        if(requiredFields.every((field) => newMember[field] !== undefined))
        return requiredFields.every((field) => newMember[field].trim() !== "");
        else
        return false;
    };
    // Update manufacturer field in vaccinations array
   const editManufacturer=(value, index)=>{
      const arr=[...VaccinationsArr]
      arr[index].manufacturer=value
      setVaccinationsArr(arr)
   }
    // Update vaccinated date field in vaccinations array
   const editVaccinatedDate=(value, index)=>{
       const arr=[...VaccinationsArr]
       arr[index].vaccinatedDate=value
       setVaccinationsArr(arr)
    }
    // Filter vaccinations to remove empty entries
    const filterVaccinations = (vaccinations) => {
        return vaccinations.filter((vaccination) => vaccination.manufacturer && vaccination.vaccinatedDate);
      };

    // Validate Israeli ID format
    function isValidIsraeliID(id) {
        if (id.length !== 9) {
            return false;
        }
    
        const idDigits = id.split('').map(Number);
        let sum = 0;
        for (let i = 0; i < idDigits.length - 1; i++) {
            let digit = idDigits[i];
            if (i % 2 === 0) {
                digit *= 1;
            } else {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }
    
        const lastDigit = idDigits[idDigits.length - 1];
        return (sum + lastDigit) % 10 === 0;
    }

    // Add or edit a member
    const add=async()=>{
        const existingMember = allMembers.find((m) => (m.MemberID === newMember.MemberID));
        //const existingMember = await getMemberByID(newMember.MemberID); // Call a function to check database for ID
        if (existingMember&&!memberData) {
            alert("A member with this ID already exists");
            return;
        }
        if(isValidIsraeliID(newMember.MemberID)===false){
            console.log(newMember.MemberID)
            alert("An invalid ID");
            return;
        }
        if ((!/^[a-zA-Z]+$/.test(newMember.firstName))||(!/^[a-zA-Z]+$/.test(newMember.lastName))) {
            alert("First and last name must contain only letters");
            return;
        }
        if (!newMember.birthDate||(new Date(newMember.birthDate)>new Date())) {
            alert("Invalid date of birth");
            return;
        }
        const phonePattern = /^\d{3}\d{7}$/; 
        if (!phonePattern.test(newMember.cellphone)) {
            alert("Please enter a valid cellphone number");
            return ;
        }       
        if (newMember.telephone&&phonePattern.test(newMember.telephone)) {
            alert("Please enter a valid phone number");
            return ;
        }
        if((VaccinationsArr.every((x) => x.manufacturer || x.vaccinatedDate))&&(!VaccinationsArr.every((x) => x.manufacturer && x.vaccinatedDate))){
            alert("All vaccine fields must be filled in");
            return;
        }    
        if((newMember.dateOfRecovery&&!newMember.positiveResult)||newMember.dateOfRecovery<newMember.positiveResult)
        {
            alert("Please enter a valid positive result");
            return;
        }
        if(newMember.address.numBuild&&!/^[0-9]+$/.test(newMember.address.numBuild))
        {
            alert("Please enter a valid builing number");
            return ;
        }
        
        //const allNewMember={...newMember,memPhoto: photo}
        const allNewMember={...newMember}

        const filteredVaccinations = filterVaccinations(VaccinationsArr);
        allNewMember.vaccinations=filteredVaccinations;

        let res
        //If on edit mode
        if (memberData){
            res=await editMember(allNewMember)
            dispatch(EditMemberAction(res.data))
            alert("Member update successful")
            page('/'); 
        }
        else{             
                   
            alert("Adding a member was successful") 
            page('/');            
            res=await addMember(allNewMember)
            dispatch(AddMemberToRedux(allNewMember)) 
        }  
    };

    const cancel=()=>{
        const confirmed = window.confirm("Are you sure you want to cancel editing and exit?");
        if (!confirmed) return;
        else{
            page('/'); 
        }
    }
    

    //Adding a vaccine to a vaccine arr
    const addVaccination=()=>{
        if (VaccinationsArr.length === 0 || VaccinationsArr.every((x) => x.manufacturer && x.vaccinatedDate)) {
            if (VaccinationsArr.length < 4) { 
            setVaccinationsArr([...VaccinationsArr, { manufacturer: "", vaccinatedDate: "" }]);
            } else {
            alert("Limited to four vaccinations");
            }
        } else {
            alert("Please fill in all vaccine details before adding a new vaccine.");
        }          
    }

   return <div className="component">  
    {!memberData&&<label className="title">Add member</label>}
    {memberData&&<label className="title">Edit member</label>}

    <div className="all-member-details">
        <div className="personal-details">

           {!memberData&&(<div><label ><b>ID:</b> </label>
           <input type="text" className="must" onChange={(e)=>
           setNewMember({...newMember, MemberID:e.target.value})}></input><br/></div>)}

           {memberData&&(<div><label ><b>ID:</b> {newMember.MemberID}<br/></label></div>)}
           
           <div><label ><b>first name:</b> </label>
           <input type="text" className="must"  value={newMember.firstName} onChange={(e)=>
            setNewMember({...newMember, firstName:e.target.value})}></input><br/></div>

           <div><label ><b>last name:</b> </label>
           <input type="text" className="must"  value={newMember.lastName} onChange={(e)=>
            setNewMember({...newMember, lastName:e.target.value})}></input><br/></div>

           <div><label ><b>birth date:</b> </label>
           <input  value={newMember.birthDate} className="must" id="birth_in"  type="date" onChange={(e)=>
            setNewMember({...newMember, birthDate:e.target.value})}></input><br/></div>
                      

           <div><label ><b>street:</b> </label>
           <input type="text" value={newMember.address.street} onChange={(e)=>
            setNewMember({ ...newMember, address: { ...newMember.address, street: e.target.value } })}></input><br/></div>
           
           <div><label><b>building number:</b> </label>
           <input type="text" value={newMember.address.numBuild} onChange={(e)=>
            setNewMember({ ...newMember, address: { ...newMember.address, numBuild: e.target.value } })}></input><br/></div>
           
           <div><label><b>city:</b> </label>
           <input type="text" value={newMember.address.city} onChange={(e)=>
            setNewMember({ ...newMember, address: { ...newMember.address, city: e.target.value } })}></input><br/></div>
                
           <div><label ><b>cellphone number: </b></label>
           <input type="tel" className="must" inputMode="numeric"  pattern="[0-9]*" value={newMember.cellphone}  onChange={(e)=>
            setNewMember({...newMember, cellphone:e.target.value})}></input><br/></div>
           
           <div><label ><b>phone number:</b> </label>
           <input type="tel" inputMode="numeric" pattern="[0-9]*" value={newMember.telephone} className="form-control" id='TextInput' onChange={(e)=>
            setNewMember({...newMember, telephone:e.target.value})}></input><br/></div>           
           
        </div>

        <div className='covid-div'><br/>
            <label className="vac-title"><b>vaccinations:</b> </label>
            {VaccinationsArr.map((x, index)=>
            <div className="row" key={x._id}>
                <div className="col">
                    <label>manufacturer: </label>
                    <input type="text" placeholder="manufacturer" value={x.manufacturer} onChange={(e)=>editManufacturer(e.target.value, index)}></input>
                </div>
                <div className="col">
                    <label>date: </label>
                    <input type="date" placeholder="date" value={x.vaccinatedDate} onChange={(e)=>editVaccinatedDate(e.target.value, index)}></input>
                </div>
            </div>)}

            <button type="button" className="add-vac" onClick={()=>addVaccination()}>Add vaccination</button><br/> <br/>   
        
            <div><label><b>date of positive test:</b> </label>
            <input type="date" onChange={(e)=>setNewMember({...newMember, positiveResult:e.target.value})}></input><br/></div>

            <div><label><b>date of recovery:</b> </label>
            <input type="date" onChange={(e)=>setNewMember({...newMember, dateOfRecovery:e.target.value})}></input><br/></div>
        </div>
    </div> 

        <p className="note-red">*Mandatory fields are marked in red</p>
        
        {!memberData && (<button className="save-btn" onClick={()=>{
                if (isRequiredFieldsFilled()) {add();} 
                else {alert("Please fill in all mandatory fields.");}
            }}> Adding Member</button>)}        

        {memberData && (<button className="save-btn" onClick={()=>{add();}}> Save member </button>)}<br/>
        <button className="cancel-btn" onClick={()=>{cancel();}}> Cancel and exit </button>

   </div>
}

