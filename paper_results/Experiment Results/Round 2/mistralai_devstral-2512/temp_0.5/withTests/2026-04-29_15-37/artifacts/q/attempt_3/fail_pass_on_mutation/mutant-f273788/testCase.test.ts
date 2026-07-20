// Test case to detect the mutation in Q.fapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply mutation test", () => {
    it("should pass arguments correctly to the function", async () => {
        const testFunction = (a: number, b: number, c: number) => {
            if (a === undefined || b === undefined || c === undefined) {
                throw new Error("Arguments not passed correctly");
            }
            return a + b + c;
        };
        const result = await Q(testFunction).fapply([1, 2, 3]);
        expect(result).toBe(6);
    });
});