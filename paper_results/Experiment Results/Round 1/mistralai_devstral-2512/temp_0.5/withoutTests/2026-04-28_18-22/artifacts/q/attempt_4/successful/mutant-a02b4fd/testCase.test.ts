const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
    it("should handle null method name by calling the object directly", () => {
        const obj = function() {
            return "called as function";
        };
        obj.method = function() {
            return "called as method";
        };

        const promise = Q(obj);
        return promise.post(null, []).then(
            (result: any) => {
                expect(result).toBe("called as function");
            },
            (error: any) => {
                throw error;
            }
        );
    });
});