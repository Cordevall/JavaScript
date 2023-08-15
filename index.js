const RunBot = require('./runbot')
const setupBot = require('./setup')
const Website = require('./website')







try {
setupBot()
}finally{
  RunBot()
  const config = require("./setup.json")
  if(config.Website == "True" ){

  }
}




