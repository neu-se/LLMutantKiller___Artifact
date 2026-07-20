// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior", () => {
    it("should correctly handle ES6 generators", async () => {
        // This test targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should handle ES6 generators properly
        // The mutation would break generator handling by always using SpiderMonkey path

        // Create a simple ES6 generator function
        function* simpleGenerator() {
            yield 1;
            yield 2;
            return "ES6 Result";
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(simpleGenerator);

        // Execute the async generator
        const result = await asyncGenerator();

        // The result should be the final return value from the ES6 generator
        expect(result).toBe("ES6 Result");
    });
});