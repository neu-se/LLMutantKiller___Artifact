// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with undefined method name", () => {
    it("should return the result of applying the function when name is undefined", async () => {
        const testObj = {
            method: function(a: number, b: number) {
                return a + b;
            }
        };
        const result = await Q(testObj).post(undefined, [1, 2]);
        expect(result).toBe(3);
    });
});