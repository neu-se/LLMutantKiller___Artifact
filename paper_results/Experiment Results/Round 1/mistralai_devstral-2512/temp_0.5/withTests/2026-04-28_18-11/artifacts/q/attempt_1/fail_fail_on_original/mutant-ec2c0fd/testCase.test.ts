import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with ES6 generators", () => {
    it("should correctly handle ES6 generator functions", async () => {
        // This test uses an ES6 generator function
        const asyncGenerator = Q.async(function* () {
            const result1 = yield Q(10);
            const result2 = yield Q(20);
            return result1 + result2;
        });

        const result = await asyncGenerator();
        expect(result).toBe(30);
    });
});