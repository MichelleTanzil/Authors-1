const authors = require('../controllers/authors.js');

module.exports = (app) => {
    app.get("/authors/", (req,res) =>{
        authors.showAll(req,res)
    });
    app.get("/author/:id", (req,res) => {
        authors.showbyID(req,res)
    });
    app.post("/author/new", (req,res) => {
        authors.createAuthor(req,res)
    });
    app.put("/author/:id", (req,res) => {
        authors.updateAuth(req,res)
    });
    app.delete("/author/:id", (req,res) => {
        authors.removeAuth(req,res)
    });
    app.put("/quotes/:id", (req,res) => {
        authors.addQuote(req,res);
    }),
    app.put("/vote/:id/:quote_id/:res", (req,res) => {
        authors.voteQuote(req,res);
    })
}