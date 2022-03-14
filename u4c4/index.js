const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () =>{
    return mongoose.connect("mongodb://127.0.0.1:27017/evaluation");
}

const userSchema = new mongoose.Schema({
    firstName : {type : String,required:true},
    middleName : {type:String},
    lastName : {type:String,required:true},
    age : {type:Number,required:true},
    email : {type:String,required:true},
    address : {type:String,required:true},
    gender : {type:String,default:"female"} ,
    type : {type:String,default:"customer"} ,
},
{
    timestamps:true,
    versionKey:false,
});

const user = new mongoose.model("users",userSchema);

//post data,
app.post("/users",async (req,res)=>{
try {
    const User = await user.create(req.body);
    res.send({User : User})
} catch (error) {
 return res.send({message : error.message})   
}
})


//brancg detail
/*

    name (required)
    address (required)
    IFSC (required and string)
    MICR (required and number )
    createdAt (required)
    updatedAt (required)

*/
const branchSchema = new mongoose.Schema({
    name : {type:String,required:true},
    address : {type:String,required:true},
    IFSC : {type:String,required:true},
    MICR : {type:Number,required:true},
},
{
    timestamps : true,
    versionKey : false,
});

const branch = mongoose.model("branches",branchSchema);

app.post("/branches",async (req,res)=>{
    try {
        const Branch = await branch.create(req.body);
        res.send({Branch : Branch})
    } catch (error) {
     return res.send({message : error.message})   
    }
    })
//Master Account
/**
 
    balance (required) This is the total balance that the person has in the bank
    createdAt (required)
    updatedAt (required)

 */
const masterSchema = new mongoose.Schema({
    balance : {type:Number,required:true},
    userId : {type:mongoose.SchemaTypes.ObjectId,
        ref:"users",
        required:true},
    managerId : {type:mongoose.SchemaTypes.ObjectId,
        ref:"users",
        required:true},
    branchId : {type:mongoose.SchemaTypes.ObjectId,
        ref:"branches",
        required:true},


},
{
    timestamps : true,
    versionKey : false,
});

const master = mongoose.model("masters",masterSchema);

app.post("/masters",async (req,res)=>{
    try {
        const Master = await master.create(req.body);
        res.send({Master:Master})
    } catch (error) {
     return res.send({message : error.message})   
    }
    })

//Saving Account
/**
 
    account_number ( required and should be unique)
    balance ( required )
    interestRate ( required )
    createdAt (required)
    updatedAt (required)

 */

    const savingAccountSchema = new mongoose.Schema({
        account_number : {type:Number,required:true},
        balance : {type:Number,required:true},
        interestRate : {type:Number,required:true},
        masterId : {type:mongoose.SchemaTypes.ObjectId,
            ref:"masters",
            required:true},
    },
    {
        timestamps : true,
        versionKey:false,
    });

    const savingAccount = mongoose.model("savingAccounts",savingAccountSchema);

    app.post("/savingAccounts",async (req,res)=>{
        try {
            const SavingAccount = await savingAccount.create(req.body);
            res.send({SavingAccount: SavingAccount})
        } catch (error) {
         return res.send({message : error.message})   
        }
        })
//Fixed Account
/**
 
    account_number ( required and should be unique)
    balance ( required )
    interestRate ( required )
    startDate ( required )
    maturityDate (required )
    createdAt (required)
    updatedAt (required)

 */

const fixedAccountSchema = new mongoose.Schema({
    account_number : {type: Number,required:true},
    balance : {type: Number,required:true},
    interestRate : {type: Number,required:true},
    startDate : {type: String,required:true},
    maturityDate : {type: String,required:true},
    masterId : {type:mongoose.SchemaTypes.ObjectId,
        ref:"masters",
        required:true},
},
{
    timestamps : true,
    versionKey : false,
});

const fixedAccount = mongoose.model("fixedAccounts",fixedAccountSchema);

app.post("/fixedAccounts",async (req,res)=>{
    try {
        const FixedAccount = await fixedAccount.create(req.body);
        res.send({fixedAccount:fixedAccount})
    } catch (error) {
     return res.send({message : error.message})   
    }
    })

app.listen(5000,async () =>{
    try {
        await connect();
    } catch (error) {
        console.log(error);
    }
    console.log("Listening")
})