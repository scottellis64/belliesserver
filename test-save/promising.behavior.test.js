import {expect} from "chai";
import Promise from "promise";
import {fromJS} from "immutable";

var promises = [
    {status : "1", ms : 10, bad : false, dep : [
        {status : "1.1", ms : 30, bad : false},
        {status : "1.2", ms : 20, bad : false, dep : [
            {status : "1.2.1", ms : 10, bad : false, dep : [
                {status : "1.2.1.1", ms : 15, bad : false},
                {status : "1.2.1.2", ms : 50, bad : false}
            ]},
            {status : "1.2.2", ms : 30, bad : false},
            {status : "1.2.3", ms : 10, bad : false, dep : [
                {status : "1.2.3.1", ms : 55, bad : false},
                {status : "1.2.3.2", ms : 25, bad : false}
            ]}
        ]},
        {status : "1.3", ms : 30, bad : false},
        {status : "1.4", ms : 40, bad : false},
        {status : "1.5", ms : 30, bad : false},
        {status : "1.6", ms : 20, bad : false},
        {status : "1.7", ms : 10, bad : false},
        {status : "1.8", ms : 90, bad : false},
        {status : "1.9", ms : 10, bad : false},
        {status : "1.10", ms : 30, bad : false},
        {status : "1.11", ms : 60, bad : false},
        {status : "1.12", ms : 30, bad : false},
        {status : "1.13", ms : 70, bad : false},
        {status : "1.14", ms : 20, bad : false},
        {status : "1.15", ms : 10, bad : false},
        {status : "1.16", ms : 30, bad : false}
    ]}
];

function createPromise(meta) {
    return asynchLogStatusAfterTimeout(meta).then((status) => {
        console.log(status);
    });
}

function asynchLogStatusAfterTimeout(meta) {
    //console.log(`Promise created for ${JSON.stringify(meta)}`);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (meta.bad) {
                reject(meta.status + " : " + meta.ms);
            } else {
                resolve(meta.status + " : " + meta.ms);
            }
        }, meta.ms);
    })
}

describe("Promises", () => {
    //it("will wait", () => {
    //    return createPromise({status : "1", ms : 50}).then(() => {
    //        return Promise.all(
    //            createPromise({status : "1.1", ms : 40, bad : false}),
    //            createPromise({status : "1.2", ms : 30}),
    //            createPromise({status : "1.3", ms : 20})
    //        );
    //    }).then(() => {
    //        return createPromise({status : "2", ms : 70}).then(() => {
    //            return createPromise({status : "2.1", ms : 1});
    //        });
    //    }).then(() => {
    //        console.log("Done!");
    //        console.log();
    //    }).catch((e) => {
    //        console.error(`Error caught ${e}`);
    //        throw e;
    //    });
    //});
    //
    //it("will nest errors", () => {
    //    return createPromise({status : "1", ms : 400}).then(() => {
    //        return createPromise({status : "1.1", ms : 300}).then(() => {
    //            return createPromise({status : "1.1.1", ms : 20});
    //        });
    //    }).then(() => {
    //        return createPromise({status : "2", ms : 39}).then(() => {
    //            return createPromise({status : "2.1", ms : 20, bad : false});
    //        });
    //    }).then(() => {
    //        console.log("Done!");
    //        console.log();
    //        console.log();
    //    }).catch((e) => {
    //        console.error(`Error caught ${e}`);
    //        throw e;
    //    });
    //});

    //it("can be chained from an array and run consecutively (one will wait for the previous", () => {
    //    let prev = null;
    //    promises.forEach((meta) => {
    //        let next = createPromise(meta);
    //        if (prev) {
    //            prev.then(next);
    //        }
    //        return prev = next;
    //    });
    //
    //    prev.then(() => {
    //        console.log("Done!");
    //    })
    //});

    function asyncStatus(meta) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (meta.get("bad")) {
                    reject(`${meta.get("status")} : ${meta.get("ms")}`);
                } else {
                    resolve(`${meta.get("status")} : ${meta.get("ms")}`);
                }
            }, meta.get("ms"));
        }).then((status) => {
            console.log(status);
        });
    }

    function processPromises(metas, prev) {
        const promise = processPromiseMeta(metas.first(), prev);
        return metas.size == 1 ? promise : promise.then(() => {
            return processPromises(metas.delete(0), promise);
        });
    }

    function processPromiseMeta(meta, prev) {
        return prev ? prev.then(() => {
            return invokeAsyncStatus(meta);
        }) : invokeAsyncStatus(meta);
    }

    function invokeAsyncStatus(meta) {
        const promise = asyncStatus(meta);
        const dep = meta.get("dep");
        return dep ? promise.then(() => {
            return processPromises(dep, promise);
        }) : promise;
    }

    it("runs all promises with no synchronizing (some will resolve quicker than others)", () => {
        return processPromises(fromJS([
            {status : "1", ms : 300, bad : false},
            {status : "2", ms : 250, bad : false},
            {status : "3", ms : 200, bad : false},
            {status : "4", ms : 150, bad : false},
            {status : "5", ms : 100, bad : false},
            {status : "6", ms : 50, bad : false},
            {status : "7", ms : 25, bad : false},
            {status : "8", ms : 5, bad : false}
        ])).then(() => {
            console.log("Done!");
        });
    });

    it("does what I want it to do", () => {
        return processPromises(fromJS(promises)).then(() => {
            console.log("Done!");
        });
    });

});