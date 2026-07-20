// Test case to detect the mutation in Q.fapply
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.fapply mutation test", () => {
    it("should pass arguments correctly to the function", async () => {
        const testFunction = (a: number, b: number, c: number) => {
            // This will fail if arguments are not passed correctly
            if (a !== 1 || b !== 2 || c !== 3) {
                throw new Error(`Expected (1,2,3) but got (${a},${b},${c})`);
            }
            return a + b + c;
        };
        const result = await Q(testFunction).fapply([1, 2, 3]);
        expect(result).toBe(6);
    });
});