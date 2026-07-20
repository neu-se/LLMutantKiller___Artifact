// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior with StopIteration", () => {
    it("should handle generators that throw StopIteration", async () => {
        // This test specifically targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should properly handle StopIteration
        // The mutation would incorrectly route these to ES6 path

        // Create a generator function that throws StopIteration
        function generatorWithStopIteration() {
            let step = 0;
            return {
                next: function() {
                    if (step === 0) {
                        step++;
                        return { value: 1, done: false };
                    } else if (step === 1) {
                        step++;
                        return { value: 2, done: false };
                    } else {
                        // Throw StopIteration to signal completion
                        const error = new Error("StopIteration");
                        (error as any).value = 3;
                        throw error;
                    }
                }
            };
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(generatorWithStopIteration);

        // Execute the async generator
        const result = await asyncGenerator();

        // The result should be the value from StopIteration
        expect(result).toBe(3);
    });
});