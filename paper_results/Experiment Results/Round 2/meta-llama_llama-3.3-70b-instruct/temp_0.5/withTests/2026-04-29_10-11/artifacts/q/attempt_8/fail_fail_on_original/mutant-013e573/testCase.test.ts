import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.npost", function () {
    it("should pass arguments correctly and fail on mutated code", function (done) {
        var obj = {
            method: function (a: number, b: number) {
                return a + b;
            }
        };

        var args = [1, 2, "Stryker was here"];
        q.npost(obj, "method", args)
        .then(function (result: number) {
            expect(result).toBe(3);
            expect(args).toEqual([1, 2, "Stryker was here"]);
            done();
        });
    });
});