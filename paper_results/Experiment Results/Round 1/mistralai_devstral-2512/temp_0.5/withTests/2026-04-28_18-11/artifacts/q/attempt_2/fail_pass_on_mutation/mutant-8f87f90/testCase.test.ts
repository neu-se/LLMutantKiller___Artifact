// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with undefined method name", () => {
    it("should apply the function when name is undefined", async () => {
        const testFn = (a: number, b: number, c: number) => a + b + c;
        const result = await Q(testFn).post(undefined, [1, 2, 3]);
        expect(result).toBe(6);
    });
});