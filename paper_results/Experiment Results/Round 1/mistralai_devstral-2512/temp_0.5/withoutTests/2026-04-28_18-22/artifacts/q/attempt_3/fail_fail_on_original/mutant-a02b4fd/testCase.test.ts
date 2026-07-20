const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
    it("should handle null method name correctly", () => {
        const obj = {
            method: function() {
                return "called";
            }
        };

        const promise = Q(obj);
        return promise.post(null, []).then(
            (result: any) => {
                expect(result).toBe("called");
            },
            (error: any) => {
                throw new Error("Should not reject when calling with null method name");
            }
        );
    });
});