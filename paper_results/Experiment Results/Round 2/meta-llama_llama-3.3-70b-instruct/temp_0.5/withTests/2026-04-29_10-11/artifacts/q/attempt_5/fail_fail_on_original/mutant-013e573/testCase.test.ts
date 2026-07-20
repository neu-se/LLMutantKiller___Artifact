import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.npost", function () {
    it("should pass arguments correctly", function () {
        var obj = {
            method: function (a: number, b: number) {
                return a + b;
            }
        };

        return Q.npost(obj, "method", [1, 2])
        .then(function (result: number) {
            expect(result).toBe(3);
        });
    });

    it("should not modify the input array", function () {
        var obj = {
            method: function (a: number, b: number) {
                return a + b;
            }
        };

        var args = [1, 2];
        return Q.npost(obj, "method", args)
        .then(function (result: number) {
            expect(result).toBe(3);
            expect(args).toEqual([1, 2]);
        });
    });
});