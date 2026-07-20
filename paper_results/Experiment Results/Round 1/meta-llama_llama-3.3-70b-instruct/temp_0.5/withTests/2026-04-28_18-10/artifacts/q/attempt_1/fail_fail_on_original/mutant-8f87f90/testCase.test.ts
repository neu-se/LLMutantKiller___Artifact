import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q post method", () => {
    it("should call a method on an object with the given name and arguments", () => {
        var obj = {
            method: function (a, b, c) {
                return a + b + c;
            }
        };

        return Q.post(obj, "method", [1, 2, 3]).then(function (result) {
            expect(result).toBe(6);
        });
    });

    it("should work as apply when given no name", () => {
        return Q(function (a, b, c) {
            return a + b + c;
        }).post(undefined, [1, 2, 3]).then(function (sum) {
            expect(sum).toBe(6);
        });
    });
});