import axios from "axios";


//Base URL for the members API endpoint.
const url = 'http://localhost:7777/api/members/';

//Fetches a list of all members from the API.
export const getAllMembers = () => {
  //logger.info("Getting all members");
  return axios.get(`${url}getAllMembers`);
};


//Fetches a single member by its ID from the API.
export const getMemberByID = (id) => {
  //logger.info("Getting member by ID");
  return axios.get(`${url}getMemberById/${id}`);
};

//Adds a new member to the API.
export const addMember = (newMember) => {
  //logger.info("Adding new member");
  return axios.post(`${url}addMember`, newMember);
};

//Deletes a member from the API by its ID.
export const deleteMember = (id) => {
  //logger.info(`Deleting member by ID: ${id}`);
  return axios.delete(`${url}dellMemberByID/${id}`);
};

//Updates an existing member in the API.
export const editMember = (editedMember) => {
  //logger.info(`Editing member with ID: ${editedMember.MemberID}`);
  return axios.put(`${url}editMember/${editedMember.MemberID}`, editedMember);
};
