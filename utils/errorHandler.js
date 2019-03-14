const errHandler = (fn) =>
  (req, res, err) => {
    Promise.resolve(fn(req, res, err))
      .catch(e => {
        console.log('Error', e);
        return res.status(400).send({ err: e });
      });
  };
  
module.exports = errHandler;