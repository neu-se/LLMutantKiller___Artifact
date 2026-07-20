import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", (done) => {
        var d = Q.defer();
        Q.nextTick(function () {
            d.resolve();
        });
        d.promise.then(function () {
            done();
        }, function (err) {
            done.fail(err);
        });
    });
});