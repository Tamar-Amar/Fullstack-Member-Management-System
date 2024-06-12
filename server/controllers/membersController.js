import express from 'express';
import membersModel from '../models/membersModel.js';
// import multer from 'multer' 

import logger from '../logger.js';

let myRout = express.Router();

import bodyParser from 'body-parser';
myRout.use(bodyParser.json()); // Use JSON parsing middleware

myRout.get('/getAllMembers', async (req, res) => {
  
  try {
    logger.info('Received GET request for getAllMembers');
    let data = await membersModel.find({});
    res.json(data);
  } catch (error) {
    logger.error('Error fetching members:', error);
    console.error(error);
    res.status(500).send('Error fetching members');
  }
});


myRout.post('/addMember', async (req, res) => {
  try {
    logger.info('Received POST request for addMember');
    let newMember = req.body;
    let y = await membersModel.create(newMember);
    res.json(y);
  } catch (error) {
    logger.error('Error adding new member:', error);
    console.error(error);
    res.status(500).send('Error adding new member');
  }
});

myRout.get('/getMemberByID/:MemberID', async (req, res) => {
  try {
    logger.info('Received GET request for getMemberByID');
    let id_m = req.params.MemberID;
    let member = await membersModel.findOne({ 'MemberID': id_m });
    res.json(member);
  } catch (error) {
    logger.error('Error getting member by ID:', error);
    console.error(error);
    res.status(500).send('Error getting member by ID');
  }
});


myRout.delete('/dellMemberByID/:MemberID', async (req, res) => {
  try {
    logger.info('Received DELETE request for dellMemberByID');
    let id_m = req.params.MemberID;
    let member = await membersModel.findOneAndDelete({ 'MemberID': id_m });
    res.json(member);
  } catch (error) {
    logger.error('Error deleting member:', error);
    console.error(error);
    res.status(500).send('Error deleting member');
  }
});

myRout.put('/editMember/:MemberID', async (req, res) => {
  try {
    logger.info('Received PUT request for editMember');
    const MemberID = req.params.MemberID;
    const updatedMember = req.body;
    const updatedData = await membersModel.findOneAndUpdate({ 'MemberID': MemberID }, updatedMember, { new: true });
    logger.info('Member updated successfully:', updatedData);
    res.json(updatedData);
  } catch (error) {
    logger.error('Error editing member:', error);
    console.error(error);
    res.status(500).send('Error editing member');
  }
});

export default myRout;
