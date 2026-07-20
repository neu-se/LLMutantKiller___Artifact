// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior with StopIteration", () => {
    it("should handle SpiderMonkey generators with StopIteration", async () => {
        // This test specifically targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should properly handle SpiderMonkey generators
        // The mutation would incorrectly route SpiderMonkey generators to ES6 path

        // Create a generator function that mimics SpiderMonkey behavior
        // by throwing a StopIteration-like exception
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
                        // Throw StopIteration to signal completion
                        const stopIteration = new Error("StopIteration");
                        stopIteration.value = 3;
                        throw stopIteration;
                    }
                }
            };
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(spiderMonkeyGenerator);

        // Execute the async generator
        const result = await asyncGenerator();

        // The result should be the final value from StopIteration
        expect(result).toBe(3);
    });
});