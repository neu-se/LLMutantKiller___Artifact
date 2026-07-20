import { Q } from "../../../../../q.js";

describe("Q function post method", () => {
    it("should call the post method with no name", () => {
        var obj = {
            post: function (...args: any[]) {
                return args[0] + args[1] + args[2];
            }
        };

        return Q.post(obj, null, [1, 2, 3]).then(function (result: any) {
            expect(result).toBe(6);
        });
    });

    it("should call the post method with a name and return the correct result when the condition is not always true", () => {
        var obj = {
            add: function (a: any, b: any, c: any) {
                return a + b + c;
            }
        };

        return Q.post(obj, "add", [1, 2, 3]).then(function (result: any) {
            expect(result).toBe(6);
        });
    });
});