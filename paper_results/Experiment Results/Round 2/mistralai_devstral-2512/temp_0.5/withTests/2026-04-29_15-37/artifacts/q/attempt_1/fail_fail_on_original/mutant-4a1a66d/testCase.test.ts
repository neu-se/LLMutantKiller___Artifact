// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior", () => {
    it("should correctly handle ES6 generators with StopIteration", async () => {
        // This test specifically targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should handle both ES6 generators and SpiderMonkey generators
        // The mutation would break ES6 generator handling

        // Create a simple ES6 generator function
        function* simpleGenerator() {
            yield 1;
            yield 2;
            return 3;
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(simpleGenerator);

        // Execute the async generator
        const result = await asyncGenerator();

        // The result should be the final return value from the generator
        expect(result).toBe(3);
    });
});