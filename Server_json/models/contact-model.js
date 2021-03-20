  
const Joi = require("joi");

class ContactModel {
  constructor(id, fullName, mail, phone, address) {
    this.id = id;
    this.fullName = fullName;
    this.mail = mail;
    this.phone = phone;
    this.address = address;
  }

  static validate(contact) {
    const validationSchema = {
      id: Joi.number().min(1),
      fullName: Joi.string().required().min(2).max(50),
      mail: Joi.string().required().min(6).max(1000),
      phone: Joi.string().required().min(7).max(1000),
      address: Joi.string().required().min(4).max(1000),
    };

    // const error = Joi.validate(contact, validationSchema, { abortEarly: false })
    //   .error;
    // if (error) {
    //   return error.details.map((err) => err.message);
    // }

    return null;
  }
}

module.exports = ContactModel;