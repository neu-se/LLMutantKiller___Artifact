// Test case to detect the mutation in Q.fapply
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fapply mutation test", () => {
    it("should pass arguments correctly to the function", async () => {
        const testFunction = (a: number, b: number, c: number) => a + b + c;
        const result = await Q(testFunction).fapply([1, 2, 3]);
        expect(result).toBe(6);
    });
});