import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async with generators", () => {
    it("should handle ES6 generators correctly", async () => {
        // Create a simple generator function that yields promises
        const generator = function* () {
            const val1 = yield Q(10);
            const val2 = yield Q(20);
            return val1 + val2;
        };

        // Wrap it with Q.async
        const asyncFunc = Q.async(generator);

        // Execute and verify the result
        const result = await asyncFunc();
        expect(result).toBe(30);
    });
});