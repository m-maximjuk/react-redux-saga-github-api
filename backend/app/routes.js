var User = require('./models/user');

function getUsers(res) {
    User.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    });
};

module.exports = function (app) {
    // app.get('/api/todos', function (req, res) {
    //     // use mongoose to get all todos in the database
    //     getTodos(res);
    // });

    // register users
    app.post('/api/register', function (req, res) {
        User.findOne({
            email : req.body.email
        }, function(err,result) {
            if(!result){
                var newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });
                User.createUser(newUser, function (err, user) {
                    if (err){
                        res.send(err);
                    }
                    else{
                        res.send(user);
                    }
                });
            }
            else{
                res.send('There is existing Email');
            }
        });
    });

    //check user in login
    app.post('/api/login', function (req, res) {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
      // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
      // res.setHeader('Access-Control-Allow-Credentials', true); // If needed
      User.findOne({
          email : req.body.email,
      }, function(err,result) {
          if(!result){
              res.send("There isn't existing Email address");
          }
          else{
              var userpassword = result.password;
              var password =  req.body.password;
                  User.comparePassword(password, userpassword, function (err, isMatch) {
                  if (err) throw err;
                  if (isMatch) {
                      //res.header("Access-Control-Allow-Origin", "*");
                      var sendValue = {'success':true,'username':result.name}
                      res.send(sendValue);
                  } else {
                      var sendValue = {'success': false}
                      res.send(sendValue);
                  }
              });
          }
      });
    });

    // delete a todo
    // app.delete('/api/users/:user_id', function (req, res) {
    //     Todo.remove({
    //         _id: req.params.user_id
    //     }, function (err, user) {
    //         if (err)
    //             res.send(err);

    //         getTodos(res);
    //     });
    // });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
