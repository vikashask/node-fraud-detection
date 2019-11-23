var knex = require('../config/knex');
var md5 = require('md5');
var message = require('../utils/message');
var httpStatus = require('../utils/httpStatus');
var mail = require('../utils/mail');
var jwt = require('jsonwebtoken');
const {
  validationResult
} = require('express-validator/check');

module.exports.getOrder = async (req, res) => {
  try {
   
    return res.json({
      response: 'order here'
    });
  } catch (error) {
    console.log(error);
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};

module.exports.postOrder = async (req, res) => {
  try {
    console.log(req.body.facebook_id);
    if(req.body.facebook_id){ ///login using facebook for mobile app
      await doSignupUsingFacebook(req,res);      
    }else if(req.body.phoneNumber){///login using mobile for mobile app
      await doLoginSignUpUsingPhone(req,res);
    }else{ ///login using email and password for website
      await doLoginUsingEmailPassword(req,res);      
    }    
  } catch (error) {
    console.log(error);
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};
module.exports.register = async (req, res) => {
  try {
    // validateError.validateError(req,res);
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
    let isUserExist = await checkUserExist(req.body.emailId);
    if(isUserExist){
      return res
      .status(httpStatus.NOT_FOUND)
      .json({
        message:message.error.USER_ALLREADY_EXIST
      });
    }else{
      var data = await knex('user').insert({email_id:req.body.emailId,password:md5(req.body.password),isActive:1});
      if(data.length>0){
        return res.json({
          message:message.success.REGISTER
        });
      }else{
        return res.json({
          response: message.error.UNABLE_REGISTER
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};

module.exports.forgotPassword = async (req,res) =>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    var userDetails = await knex('user').where({email_id:req.body.emailId,isActive:1});
    if(userDetails.length>0){
      // console.log("data",JSON.parse(JSON.stringify(userDetails)));
      const data = {emailId:req.body.emailId};
      mail.sendMail(data);
      return res.json({
        response: message.success.FORGOT_PASSWORD_SENT
      });
    }else{
      return res
      .status(httpStatus.UNAUTHORIZED)
      .json({
        response: message.error.USER_NOT_EXIST
      });
    }
  } catch (error) {
    console.log(error);
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};

module.exports.verifyOtp = async (req,res) =>{
  try {
    console.log("verify-otp");
    
    var userDetails = await knex('user').where({id:req.body.user_id});
    if(userDetails.length>0){
      if(userDetails[0].otp==req.body.otp){
        var userDetails = await getUserDetails(userDetails[0].id);
        return res.json({response:userDetails,message: message.success.OTP_VERIFIED});
      }else{
        return res.status(httpStatus.UNAUTHORIZED).json({response: message.error.INVALID_OTP});
      }
    }else{
      return res.status(httpStatus.UNAUTHORIZED).json({response: message.error.USER_NOT_EXIST});
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({response: error});
  }
};

var checkUserExist = async (email_id) =>{
  try {
    console.log('email_id',email_id);

    var data = await knex('user').where({email_id:email_id,isActive:1});
    console.log("data",data.length);
    if(data.length>0){
      return true;
    }else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
    // return res
    // .status(httpStatus.INTERNAL_SERVER_ERROR)
    // .json({
    //   response: error
    // });
  }
};
var doSignupUsingFacebook = async (req,res) =>{
  try {
    var curTime = new Date().getTime();
    if(req.body.emailId || req.body.phoneNumber){
      console.log("Email or Phone found");
      if(req.body.emailId){
        var selectData = await knex('user').where({email_id:req.body.emailId}).select("id","email_id");
      }else if(req.body.phoneNumber){
        var selectData = await knex('user').where({phone_number:req.body.phoneNumber}).select("id","email_id");
      }
      console.log("Data"+selectData);
      if(selectData.length>0){
        console.log("Update Data into table");
        var data = await knex('user').update({
          email_id: req.body.emailId ? req.body.emailId: '',
          first_name: req.body.firstName ? req.body.firstName: '',
          last_name: req.body.lastName ? req.body.lastName : '',
          phone_number: req.body.phoneNumber ? req.body.phoneNumber : '',
          updated: curTime
        }).where({id:selectData[0].id});
        if(selectData){
          var userDetails = await getUserDetails(selectData[0].id);
          return res.json({
            response: JSON.parse(JSON.stringify(userDetails)),
            message:message.success.LOGIN
          });
        }else{
          res
          .status(httpStatus.UNAUTHORIZED)
          .json({
            success: false,
            message: 'Authentication failed. Invalid login credintials'
          });
        }
      }else{
        var data = await knex('user').insert({          
          facebook_id: req.body.facebook_id,
          email_id: req.body.emailId,
          first_name: req.body.firstName,
          last_name: req.body.lastName ? req.body.lastName : '',
          phone_number: req.body.phoneNumber ? req.body.phoneNumber : '',
          employee_role_id: 2,
          isActive: 1,
          created: curTime,
          updated: curTime
        });
        if(data.length>0){
          console.log("Datatatt"+data);
          var userDetails = await getUserDetails(data);
          return res.json({
            response: JSON.parse(JSON.stringify(userDetails)),
            message:message.success.LOGIN
          });
        }else{
          res
          .status(httpStatus.UNAUTHORIZED)
          .json({
            success: false,
            message: 'Authentication failed. Invalid login credintials'
          });
        }
      }
    }    
  } catch (error) {
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};
var doLoginSignUpUsingPhone = async (req,res) =>{
  try {
    var cutTime = new Date().getTime();
    if(req.body.phoneNumber!=''){
      var selectData = await knex('user').where({phone_number:req.body.phoneNumber}).select('id');
      if(selectData.length>0){
        var data = await knex('user').update({
          otp: 1234,
          updated: cutTime
        }).where({id:selectData[0].id}); //.then(function(retData){
        if(selectData.length>0){  
          var userDetails = await getUserDetails(selectData[0].id);
          return res.json({
            response: JSON.parse(JSON.stringify(userDetails)),
            message:message.success.OTP_SENT
          });
        }else{
          res
          .status(httpStatus.UNAUTHORIZED)
          .json({
            success: false,
            message: 'Authentication failed. Invalid login credintials'
          });
        }
        
      }else{
        var data = await knex('user').insert({    
          phone_number: req.body.phoneNumber ? req.body.phoneNumber : '',
          employee_role_id: 2,
          isActive: 1,
          created: cutTime,
          updated: cutTime,
        });
        if(data.length>0){  
          var userDetails = await getUserDetails(data[0]);
          return res.json({
            response: JSON.parse(JSON.stringify(userDetails)),
            message:message.success.OTP_SENT
          });
        }else{
          res
          .status(httpStatus.UNAUTHORIZED)
          .json({
            success: false,
            message: 'Authentication failed. Invalid login credintials'
          });
        }
      }
    }    
  } catch (error) {
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};

var doLoginUsingEmailPassword = async (req,res) =>{
  try{  
    var data = await knex('user').where({email_id:req.body.emailId,password:md5(req.body.password),isActive:1});
    if(data.length>0){
      var payload = {
        email_id: req.body.emailId,
        password: req.body.password
      };
      var token = jwt.sign(payload, 'vikask', {
          algorithm: 'HS256',
          expiresIn: 86400 // expires in 24 hours
      });      
      return res.json({
        response: JSON.parse(JSON.stringify(data)),
        token:token,
        message:message.success.LOGIN
      });
    }else{
      res
      .status(httpStatus.UNAUTHORIZED)
      .json({
        success: false,
        message: 'Authentication failed. User id or password is not correct.'
      });
    }
  }catch (error) {
    console.log(error);
    return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      response: error
    });
  }
};
var getUserDetails = async (id) =>{
  if(id){
    var userDetails = await knex('user').where({id:id}); 
    return userDetails;
  }else{
    return false;
  }
};
