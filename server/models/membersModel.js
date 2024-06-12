import myMongoose from "mongoose";
let MembersSchema= myMongoose.Schema({
    "MemberID":String,
    "firstName":String,
    "lastName":String,
    "address":{
        "street":String,
        "numBuild":String,
        "city":String
    },
    "birthDate":Date,
    "cellphone":String,
    "telephone":String,
    //"memPhoto": File,
    // "memPhoto": {
    //     "data": Buffer, 
    //     "contentType": String
    // },
    "vaccinations":[{
        "manufacturer":String,
        "vaccinatedDate":Date
    }], 
    "dateOfRecovery":Date,
    "positiveResult":Date
})


let membersModel = myMongoose.model("myNameChoose",MembersSchema,"members")

export default membersModel
