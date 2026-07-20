// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with undefined method name", () => {
    it("should return a value when name is undefined", async () => {
        const testFn = function(a: number, b: number) {
            return a + b;
        };
        const result = await Q(testFn).post(undefined, [2, 3]);
        expect(result).toBeDefined();
    });
});