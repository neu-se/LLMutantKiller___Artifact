import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function post method", () => {
    it("should throw an error when the post method is called with no name and the condition is always true", () => {
        var obj = {
            post: function (...args: any[]) {
                return args[0] + args[1] + args[2];
            }
        };

        expect(() => Q.post(obj, null, [1, 2, 3])).toThrowError();
    });
});