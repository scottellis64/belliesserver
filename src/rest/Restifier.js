import restify from "restify";
import async from "async";

export default class Restifier {
    constructor (model) {
        this.model = model;
    }

    query () {
        return (req, res, next) => {
            Restifier.removeCORSRestrictions(res);

            //console.log(`Query: ${JSON.stringify(req.params)}`);

            var queryParms = {};
            if (req.params.q) {
                try {
                    queryParms = JSON.parse(req.params.q);
                } catch (err) {
                    return res.send(400, { message: 'Query is not a valid JSON object', errors: err });
                }
            }

            return this.model.find(queryParms, (err, objects) => {
                var len = objects.length;
                if (len > 0) {
                    res.header("Content-Range", "items 0-" + (len-1) + "/" + len);
                }

                next.ifError(err);

                res.send(objects);
                next();
            });
        }
    }

    detail() {
        return (req, res, next) => {
            //console.log("Detail:");
            //console.log(req.params);

            Restifier.removeCORSRestrictions(res);

            return this.model.findOne({_id : req.params.id}, (err, one) => {
                next.ifError(err);
                res.send(one);
                next();
            });
        }
    }

    insert() {
        return (req, res, next) => {
            Restifier.removeCORSRestrictions(res);
            var model = new this.model(req.body);
            async.waterfall([
                this.save(model),
                this.setLocationHeader(req, res),
                this.sendData(res)
            ], next);
        }
    }

    update() {
        return (req, res, next) => {
            Restifier.removeCORSRestrictions(res);
            this.model.findOne({_id : req.params.id}, (err, model) => {
                next.ifError(err);

                if (! model) {
                    return next(new restify.ResourceNotFoundError(req.params.id));
                }

                if (! req.body) {
                    return next(new restify.InvalidContentError('No update data sent'));
                }

                model.set(req.body);

                async.waterfall([
                    this.save(model),
                    this.setLocationHeader(req, res),
                    this.sendData(res)
                ], next);
            }).exec();
        }
    }

    remove() {
        return (req, res, next) => {
            Restifier.removeCORSRestrictions(res);
            this.model.findOne({_id : req.params.id}, (err, model) => {
                next.ifError(err);

                if (! model) {
                    return next(new restify.ResourceNotFoundError(req.params.id));
                }

                model.remove((err) => {
                    next.ifError(err);
                    res.send(200, model);
                });
            }).exec();
        }
    }

    save(model) {
        return (callback) => {
            model.save((err, model) => {
                if (err) {
                    return callback(Restifier.restifyError(err));
                } else {
                    callback(null, model);
                }
            });
        }
    }

    sendData(res) {
        return (model, callback) => {
            res.send(model);
            callback(undefined, model);
        }
    }

    static restifyError(err) {
        if ('ValidationError' !== err.name) {
            return err;
        }

        return new restify.InvalidContentError({
            body : {
                message : 'Validation failed',
                errors : err.errors
        }});
    }

    setLocationHeader(req, res) {
        return (model, callback) => {
            res.header('Location', req.url + '/' + model._id);
            callback(null, model);
        };
    }

    static removeCORSRestrictions(res) {
        // These headers comply with CORS and allow us to mongodbServer our response to any origin
        res.header( 'Access-Control-Allow-Origin', '*' );
        //res.header( 'Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, PATCH' );
        //res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control, Content-Range, X-Content-Range' );
        //res.header( "Access-Control-Expose-Headers", "content-range, x-content-range");
    }
}