const mongoose = require('mongoose');
const Author = mongoose.model('Author');

module.exports = {
    showAll : (req,res) => {
        Author.find({}).sort('name').exec((err, authors) => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                res.json({message : "SUCCESS", data : authors});
            }
        })
    },
    showbyID : (req,res) => {
        Author.findOne({_id: req.params.id} , (err,author) => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                res.json({message : "SUCCESS", data : author});
            }
        })
    },
    createAuthor : (req,res) => {
        var newAuth = new Author({
            name : req.body.name
        });
        newAuth.save( err => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                res.json({message : "SUCCESS"});
            }
        })
    },
    updateAuth : (req,res) => {
        Author.findOne({_id: req.params.id}, (err, author) => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                author.name = req.body.name;
                author.save(err=>{
                    if(err){
                        res.json({message : "ERROR", data : err});
                    }else{
                        res.json({message : "SUCCESS"});
                    }
                })
            }
        })
    },
    removeAuth : (req,res) => {
        Author.deleteOne({_id : req.params.id}, err => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                res.json({message : "SUCCESS"});
            }
        })
    },
    addQuote : (req,res) => {
        Author.updateOne({_id: req.params.id}, {$push : {quotes : req.body}}, err => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                res.json({message : "SUCCESS"});
            }
        })
    },
    voteQuote : (req, res) => {
        let change = false;
        Author.findOne({_id: req.params.id}, (err,author) => {
            if(err){
                res.json({message : "ERROR", data : err});
            }else{
                for(var i=0; i<author.quotes.length; i++){
                    if(author.quotes[i]._id == req.params.quote_id){
                        if(req.params.res == "up"){
                            author.quotes[i].rank++;
                            change = true;
                        }else{
                            author.quotes[i].rank--;
                            change = true;
                        }
                        if(change){
                            author.save( err => {
                                if(err){
                                    res.json({message : "ERROR", data : err});
                                }else{
                                    res.json({message : "SUCCESS", data : author});
                                    }
                                })
                            break;
                        }
                    }
                }
            }
        })
    }
}