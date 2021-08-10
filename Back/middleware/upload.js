const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'+req.body.type)
    },
    filename: function (req, file, cb) {
         console.log(req.body.user_id);
      cb(null, req.body.user_id + '-' + Date.now()+file.originalname)
    }
  })
const upload = multer({ storage:storage});
module.exports=upload;