import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.npost", function () {
    it("should pass arguments correctly and fail on mutated code", function () {
        var obj = {
            method: function (a: number, b: number) {
                return a + b;
            }
        };

        var args = [1, 2];
        return q.npost(obj, "method", args)
        .then(function (result: number) {
            expect(result).toBe(3);
            expect(args).toEqual([1, 2]);
        });
    });
});