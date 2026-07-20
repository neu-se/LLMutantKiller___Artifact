import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call post method with name and args", () => {
        var obj = {
            testMethod: function(arg1: any, arg2: any) {
                return arg1 + arg2;
            }
        };

        return Q(obj).post("testMethod", [1, 2]).then((result: any) => {
            expect(result).toBe(3);
        });
    });
});