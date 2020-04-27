const Account = require('../model/account');
const utils = require('utility');

// Encapsulating MD5 encryption rules
function my_md5(password) {
    const msg = 'akdf352FHhjfFHI34=123-`.WRL23K23fhKJFHkhFJ@1231!*@%!^';
    return utils.md5(utils.md5(msg + password))
}

// Register
exports.createAcc = (req, res) =>{
    Account.findOne({username : req.body.username})
        .then(existAcc => {
            if(existAcc) {
                return res.send({
                    'msg' : "Oops~ This account already exist"
                });
            }
            const account = new Account({
                username : req.body.username,
                password : my_md5(req.body.password),
                address : req.body.address,
                type : req.body.type,
                histories :[]
            });
            account.save().then(()=>{
                res.status(200).send({
                    'code' : 0,
                    'user' :account,
                    'msg' : "Your're done, welcome to Crypto Gambling!"
                });
            }).catch(err =>{
                res.status(500).send({
                    'msg' : "Something wrong happened: " + err
                });
            });
        });
};

// Login: check the log in input compare to database
exports.checkAcc = (req,res) =>{
    const data = {
        username : req.body.username,
        password :  my_md5(req.body.password)
    };
    Account.findOne(data, (error, user) =>{
        if(!user || error){
            res.send({
                'msg' : 'username/Password does not exist.'
            });
        }else{
            res.cookie('userId',user._id);
            res.status(200).send({
                'code' : 0,
                'user' : user,
                'msg' : 'Login successful.'
            });
        }
    })
};

//loginOut
exports.loginOut = (req,res) => {
    const {userId} = req.cookies;
    if(!userId) {
        return res.send({
            'code' : 1,
            'message' : 'Server error'
        })
    }
    res.clearCookie('userId')
    return res.status(200).send({
        'code' : 0,
        'msg':'Login out successful.'
    });
};

// Get user by id
exports.getUser = (req,res) => {
    const data = {
        username: req.body.username};
    Account.findOne(data,(error,user) =>{
        if(!user || error){
            res.status(401).send({
                'message' : '_id does not exist.'
            })
        }else{
            res.send({'user': user});
        }
    })
};

//check login
exports.checkLogin = (req,res) => {
    const {userId} = req.cookies;
    const data = {
        _id: userId};
    if(!userId){
        return res.send({
            'code' : 1,
            'message' : 'Account is not logged in'
        })
    }
    Account.findOne(data,(err,user) => {
        if(!user || err){
            res.status(401).send({
                'code' : 1,
                'message' : '_id does not exist.'
            })
        }else{
            res.status(200).send({
                'code' : 0,
                'user' : user
            });
        }
    })
    // Account.findOne(data,(err,doc) => {
    //     if(err){
    //         res.send({
    //             'code' : 1,
    //             'message' : 'Error'
    //         })
    //     }
    //     if(doc){
    //         res.status(200).send({
    //             'code' : 0,
    //             'message' : 'Account is logged in',
    //             'data' : doc
    //         })
    //     }
    // })
};
// Get all users
exports.getUsers = (req,res)=> {
    Account.find({},(error,allUsers) => {
        allUsers.sort((a,b) => {
            return b.posts.length - a.posts.length;
        });

        res.status(200).send({'allUsers':allUsers});
    });
};

//push one history
exports.pushHis = (req,res)=>{
    Account.findOne({ _id: req.cookies.userId })
        .then(account => {
            account.histories.push(
                {
                    date: new Date(),
                    address: req.body.address,
                    number: req.body.number
                });

            account.save().then(() => {
                res.status(200).send({message: 'History created successfully'});
            });
        }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred."
        });
    });
};

//get all history
exports.getHis = (req,res)=>{
    let allHis = [];
    Account.findOne({ _id: req.cookies.userId })
        .then(account =>{
            let i = 0;
            while(i < account.histories.length){
                allHis.push(account.histories[i]);
                i++;
            }
            res.status(200).send({'allHis':allHis});
        });
};