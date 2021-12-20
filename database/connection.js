const mongoose=require('mongoose');

 function dbConnection(){
  mongoose.connect(
    'mongodb+srv://Zainab_Samreen:Sr3V8KiGp74ZyBG@cluster0.cociq.mongodb.net/DbSessions?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("db connection done");
    })
    .catch((e) => {
      console.log(e);
    })
  }
  module.exports={dbConnection}
