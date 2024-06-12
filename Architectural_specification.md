## MERN Stack Health Insurance Member Management System

### **Frontend (React):**

- Uses React components to build the user interface (UI).
  - Member List component: Displays a list of members fetched from the API using `getAllMembers` function from memberAxios file.
  - Add Member component: Provides a form to capture new member details and calls `addMember` function to send validated data to the backend, only if validation passes.
  - Edit Member component: Allows editing existing member information and calls `editMember` function to send validated data to the backend, only if validation passes.
  - Member Details component: Displays details of a specific member retrieved using `getMemberByID` function.

**Redux Setup:**

- Redux store is created to hold the application state (e.g., member list, member details).
- Reducers handle actions dispatched from components to update the state (e.g., adding a new member, editing an existing member).
- Components connect to the Redux store using react-redux to access state and dispatch actions.

**Example Code Snippets (React):**

```jsx
// Home.jsx

import React, { useState, useEffect } from 'react';
import { getAllMembers } from './Axios/memberAxios';

export const Home = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    async function loadData() {
        let response = await getAllMembers()
        setArr(response.data)
        dispatch(FillDataMember(response.data))
    } loadData()
  },[])

    fetchMembers();
  }, []);

  // ... 
};

```

### **Backend (Node.js + Express):**

- Uses Express to define API endpoints and handle requests from the frontend.
- Uses Mongoose to interact with MongoDB for CRUD operations on member data.

**Example Code Snippets (Backend - membersController.js):**

```javascript
const express = require('express');
const membersModel = require('../models/membersModel.js');

const router = express.Router();

// ... other API endpoints as mentioned previously (getAllMembers, getMemberByID, etc.)

// Example for editMember endpoint
router.put('/members/:MemberID', async (req, res) => {
  try {
    const memberId = req.params.MemberID;
    const updatedMember = req.body;
    const updatedData = await membersModel.findOneAndUpdate({ MemberID: memberId }, updatedMember, { new: true });
    if (!updatedData) {
      return res.status(404).send('Member not found');
    }
    res.json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error editing member');
  }
});

module.exports = router;
```

### **Database (MongoDB):**

- Stores member data according to the defined schema in `membersModel.js`. 

**Explanation of the data schema:**

**Overall Purpose:**
- This Mongoose schema defines the structure of how member data is organized and stored in the MongoDB database.
- It serves as a blueprint for creating and interacting with member documents.

**Schema Breakdown:**

**1. Member Data Fields:**
   - `MemberID`: A unique string identifying each member.
   - `firstName`: The member's first name.
   - `lastName`: The member's last name.
   - `address`: A nested object containing:
     - `street`: The member's street address.
     - `numBuild`: The member's building number or house number.
     - `city`: The member's city.
   - `birthDate`: The member's birth date, stored as a date object.
   - `cellphone`: The member's cellphone number.
   - `telephone`: The member's optional telephone number.
   - `vaccinations`: An array of vaccination objects, containing:
     - `manufacturer`: The vaccine manufacturer.
     - `vaccinatedDate`: The date the vaccine was administered.
   - `dateOfRecovery`: The date the member recovered from COVID-19 (optional).
   - `positiveResult`: The date the member tested positive for COVID-19 (optional).

**2. Potential Image Storage (Commented Out):**
   - `memPhoto`: A commented-out field, suggesting possible image storage in the future.
     - Options considered:
       - Storing the image file directly as a File object or
       - Storing image data as a Buffer with a content type.

**3. Model Creation:**
   - The `membersModel` is created using Mongoose's `model` function, mapping the `MembersSchema` to a MongoDB collection named "members".

**4. Key Points:**
   - The schema enforces data structure consistency in the database.
   - It ensures expected fields and data types are present.
   - Flexible arrays like `vaccinations` allow for multiple entries per member-while limiting them to four according to the requirement.
   - Nested objects like `address` group related information for clarity.




 ## Add Member component Data Flow: ##

1. **User interaction:**
   - The process starts with the user interacting with the React UI, specifically the Add Member form.
2. **Client-side validation:**
   - The frontend performs client-side validation to ensure the user-entered data is valid.
3. **Data submission :**
   - If validation passes, the Data is submitted, and the validated `newMember` object is sent to the backend using the `addMember` function.
4. **Backend processing:**
   - The backend controller receives the `newMember` object.
   - The controller calls on Mongoose (an ORM) to save the data to MongoDB.
5. **Database insertion:**
   - Mongoose interacts with MongoDB to insert the new member data into the database.
6. **Response:**
   - The backend sends a response back to the frontend, containing either the newly created member data (on success) or an error message (if any issues occurred).
7. **Frontend updates:**
   - The React UI receives the response from the backend and updates the UI accordingly:
     - If successful, it might display a success message or the updated member list.
     - If there are errors, it handles them gracefully, potentially displaying error messages or prompting the user to correct input.
   - **Redux update:** After receiving a response from the API, the React UI updates the Redux Store with the new member data (or errors).
