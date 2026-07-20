import { Q } from "../../../../../q.js";

describe("Q function post method", () => {
    it("should call the post method with no name and return the correct result when the condition is not always true", () => {
        var obj = {
            post: function (...args: any[]) {
                return args[0] + args[1] + args[2];
            }
        };

        // In the original code, this should pass
        return Q.post(obj, null, [1, 2, 3]).then(function (result: any) {
            expect(result).toBe(6);
        });
    });
});