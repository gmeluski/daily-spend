
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.spend = function(req, res) {
    res.render('index', { title: '30' });
}; 
