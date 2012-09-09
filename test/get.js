var should = require("should")
var client = require("redis").createClient()

describe("get", function(){
  var rolodex = require("../rolodex")()
  
  before(function(done){
    var validAccountDetails = { 
      "email": "brock@sintaxi.com",
      "email_verified": true
    }

    rolodex.account.set(validAccountDetails, function(errors, account){
      global.account_id = account.id
      global.uuid = account.uuid
      done()
    })
  })

  it("should get by id", function(done) {
    rolodex.account.get(account_id, function(account){
      account.should.have.property("id", account_id)
      account.should.have.property("email", "brock@sintaxi.com")
      account.should.have.property("uuid")
      account.should.have.property("login_at")
      account.should.have.property("login_count", 0)
      account.should.have.property("created_at")
      account.should.have.property("updated_at")
      done()
    })
  })

  it("should get by email", function(done) {
    rolodex.account.get({ email: "brock@sintaxi.com" }, function(account){
      account.should.have.property("id", account_id)
      account.should.have.property("email", "brock@sintaxi.com")
      account.should.have.property("uuid")
      account.should.have.property("login_at")
      account.should.have.property("login_count", 0)
      account.should.have.property("created_at")
      account.should.have.property("updated_at")
      done()
    })
  })
  
  it("should get by UUID", function(done) {
    rolodex.account.get({ uuid: uuid }, function(account){
      account.should.have.property("id", account_id)
      account.should.have.property("email", "brock@sintaxi.com")
      account.should.have.property("login_at")
      account.should.have.property("login_count", 0)
      account.should.have.property("created_at")
      account.should.have.property("updated_at")
      done()
    })
  })

  it("should return null if not present", function(done) {
    rolodex.account.get(99, function(account){
      should.not.exist(account)
      done()
    })
  })

  after(function(){
    client.flushall()
    client.quit()
  })

})
