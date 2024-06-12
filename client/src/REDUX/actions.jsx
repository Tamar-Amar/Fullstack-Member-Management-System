// Creates an action object to add a new member to the Redux store.
export const AddMemberToRedux = (member) => {
    return { type: 'ADD-MEMBER-TO-REDUX', payload: member };
};
  
// Creates an action object to replace the entire member data in the Redux store.
export const FillDataMember = (val) => {
    return { type: 'FILL-DATA-MEMBER', payload: val };
};
  
//Creates an action object to delete a member from the Redux store based on its ID.
export const DeleteMemberAction = (memberId) => {
    return { type: 'DELETE-MEMBER', payload: memberId };
};
  
//Creates an action object to edit a member in the Redux store.
export const EditMemberAction = (editedMember) => {
    return { type: 'EDIT-MEMBER', payload: editedMember };
};
  
