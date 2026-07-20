import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.npost", function () {
    it("should pass arguments correctly", function (done) {
        var obj = {
            method: function (a, b) {
                return a + b;
            }
        };

        Q.npost(obj, "method", [1, 2])
        .then(function (result) {
            expect(result).toBe(3);
            done();
        });
    });

    it("should not modify the input array", function (done) {
        var obj = {
            method: function (a, b) {
                return a + b;
            }
        };

        var args = [1, 2];
        Q.npost(obj, "method", args)
        .then(function (result) {
            expect(result).toBe(3);
            expect(args).toEqual([1, 2]);
            done();
        });
    });
});