import { Q } from "../../../../../q.js";

describe("Q function post method", () => {
    it("should call the post method with a name and return the correct result", () => {
        var obj = {
            add: function (a: any, b: any, c: any) {
                return a + b + c;
            }
        };

        return Q.post(obj, "add", [1, 2, 3]).then(function (result: any) {
            expect(result).toBe(6);
        });
    });

    it("should not call the post method with no name when the condition is always true in the mutated code", () => {
        var obj = {
            post: function (...args: any[]) {
                return args[0] + args[1] + args[2];
            }
        };

        // This should pass in the original code and fail in the mutated code
        return Q.post(obj, null, [1, 2, 3]).then(function (result: any) {
            expect(result).toBe(6);
        });
    });
});