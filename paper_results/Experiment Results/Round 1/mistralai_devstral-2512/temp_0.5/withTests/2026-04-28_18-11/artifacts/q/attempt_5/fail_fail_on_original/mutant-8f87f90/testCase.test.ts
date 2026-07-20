// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.post behavior with undefined method name", () => {
    it("should return undefined when name is undefined and value is not a function", async () => {
        const testObj = { a: 1, b: 2 };
        const result = await Q(testObj).post(undefined, [1, 2, 3]);
        expect(result).toBeUndefined();
    });
});