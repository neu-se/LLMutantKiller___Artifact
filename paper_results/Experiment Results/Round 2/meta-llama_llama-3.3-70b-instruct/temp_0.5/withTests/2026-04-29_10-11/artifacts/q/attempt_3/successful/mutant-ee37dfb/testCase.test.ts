import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call post method with name and args", () => {
        var obj = {
            testMethod: function(arg1: any, arg2: any) {
                return arg1 + arg2;
            }
        };

        var promise = q.default(obj).post("testMethod", [1, 2]);
        expect(typeof promise.then).toBe('function');
        expect(typeof promise.catch).toBe('function');
    });

    it("should return the correct result from post method", (done) => {
        var obj = {
            testMethod: function(arg1: any, arg2: any) {
                return arg1 + arg2;
            }
        };

        q.default(obj).post("testMethod", [1, 2]).then((result: any) => {
            expect(result).toBe(3);
            done();
        }).catch((error) => {
            expect(true).toBe(false);
            done();
        });
    });
});