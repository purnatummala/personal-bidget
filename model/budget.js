const mongoose = require("mongoose");
const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    color: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return /^#[0-9A-Fa-f]{6}$/.test(value);
          },
          message: 'The color field must be enforced to be in the at least 6 digits (hexadecimal format. (eg: #ED4523)).',
        },
    },
}, {
    collection: "MyBudget" 
});


module.exports = mongoose.model('MyBudget', budgetSchema);