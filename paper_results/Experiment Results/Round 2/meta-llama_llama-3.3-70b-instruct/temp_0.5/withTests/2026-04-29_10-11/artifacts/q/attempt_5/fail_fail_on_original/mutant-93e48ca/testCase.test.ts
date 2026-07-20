import { Q } from "../../../../../../../../subject_repositories/q/q.js";

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
});