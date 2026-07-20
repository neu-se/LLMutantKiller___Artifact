// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior", () => {
    it("should correctly distinguish between ES6 and SpiderMonkey generators", async () => {
        // This test targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should handle ES6 generators properly
        // The mutation would incorrectly route all generators to SpiderMonkey path

        // Create a simple ES6 generator function
        function* es6Generator() {
            yield 1;
            yield 2;
            return "ES6 Result";
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(es6Generator);

        // Execute the async generator
        const result = await asyncGenerator();

        // The result should be the final return value from the ES6 generator
        expect(result).toBe("ES6 Result");

        // Now test with a mock SpiderMonkey-style generator
        // This should fail on the mutated code because it would be incorrectly
        // routed to the ES6 path
        function spiderMonkeyGenerator() {
            let state = 0;
            return {
                next: function() {
                    if (state === 0) {
                        state++;
                        return 1;
                    } else if (state === 1) {
                        state++;
                        return 2;
                    } else {
                        // Simulate StopIteration
                        const error = new Error();
                        error.name = "StopIteration";
                        (error as any).value = "SpiderMonkey Result";
                        throw error;
                    }
                }
            };
        }

        // This should work on original code but fail on mutated code
        // because the mutation would incorrectly route it to ES6 path
        const spiderAsyncGenerator = Q.async(spiderMonkeyGenerator);
        const spiderResult = await spiderAsyncGenerator();
        expect(spiderResult).toBe("SpiderMonkey Result");
    });
});