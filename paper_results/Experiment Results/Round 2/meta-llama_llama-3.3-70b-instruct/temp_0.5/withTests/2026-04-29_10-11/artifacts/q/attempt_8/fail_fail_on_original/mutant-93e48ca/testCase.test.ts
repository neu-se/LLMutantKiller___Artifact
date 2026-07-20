import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function post method", () => {
    it("should throw an error when the post method is called with a non-existent method name", () => {
        var obj = {
            add: function (a: any, b: any, c: any) {
                return a + b + c;
            }
        };

        // This should pass in the original code and fail in the mutated code
        expect(() => Q.post(obj, "nonExistentMethod", [1, 2, 3])).toThrowError();
    });
});