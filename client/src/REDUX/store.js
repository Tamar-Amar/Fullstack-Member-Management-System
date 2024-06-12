import { legacy_createStore } from 'redux';
import { produce } from 'immer';

/**
 * Defines the initial state of the Redux store.
 * This object represents the initial data structure for the application.
 *
 * @property {Array<Object>} allMembers_Store - An empty array to store member objects.
 */

const initialState = {
  allMembers_Store: [],
};

/**
 * Reducer function that handles actions dispatched to the Redux store.
 * It takes the current state and an action object as arguments.
 * Based on the action type, it updates the state immutably using Immer's `produce` function.
 *
 * @param {Object} state - The current state of the Redux store.
 * @param {Object} action - The action object dispatched, containing a type and payload.
 * @returns {Object} The updated state object.
 */

const reducer = produce((state, action) => {
  switch (action.type) {
    case 'ADD-MEMBER-TO-REDUX': {
      //Adds a new member object to the `allMembers_Store` array.
      state.allMembers_Store.push(action.payload);
      break;
    }
    case 'FILL-DATA-MEMBER': {
      //Replaces the entire `allMembers_Store` array with the provided payload.
      state.allMembers_Store = action.payload;
      break;
    }
    case 'DELETE-MEMBER': {
       //Deletes a member object from the `allMembers_Store` array based on its ID.
       //action.payload - The ID of the member to be deleted.
      const memberId = action.payload;
      const memberIndex = state.allMembers_Store.findIndex(
        (member) => member.MemberID === memberId
      );
      if (memberIndex !== -1) {
        state.allMembers_Store.splice(memberIndex, 1);
      }
      break;
    }
    case 'EDIT-MEMBER': {
       // Edits a member object in the `allMembers_Store` array based on its ID.
       // Replaces the existing member object with the updated data in the payload.
      const editedMemberId = action.payload.MemberID;
      const memberIndex = state.allMembers_Store.findIndex(
        (member) => member.MemberID === editedMemberId
      );

      if (memberIndex !== -1) {
        state.allMembers_Store[memberIndex] = action.payload;
      }
      break;
    }
    default:
      // No explicit default case needed as Immer handles unchanged state.
  }
});

/**
 * Creates a Redux store using the provided reducer function and initial state.
 * @param {Function} reducer - The reducer function that handles actions and updates state.
 * @param {Object} initialState - The initial state object to seed the store.
 * @returns {Object} The created Redux store instance.
 */

const store_Store = legacy_createStore(reducer, initialState);

// Expose the store for global access
window.store = store_Store;

export default store_Store;


