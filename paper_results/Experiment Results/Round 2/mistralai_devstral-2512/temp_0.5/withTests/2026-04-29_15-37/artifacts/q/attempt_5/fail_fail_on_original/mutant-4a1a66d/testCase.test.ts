// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior with Q.return", () => {
    it("should handle Q.return in SpiderMonkey-style generators", async () => {
        // This test specifically targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should properly handle SpiderMonkey generators with Q.return
        // The mutation would incorrectly route these to ES6 path

        // Create a generator function that uses Q.return (SpiderMonkey style)
        function spiderMonkeyStyleGenerator() {
            let step = 0;
            return function(verb, arg) {
                if (verb === "next") {
                    if (step === 0) {
                        step++;
                        return 1;
                    } else if (step === 1) {
                        step++;
                        return 2;
                    } else {
                        // Use Q.return to signal completion with value
                        Q["return"](3);
                    }
                }
                throw new Error("Unexpected verb: " + verb);
            };
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(spiderMonkeyStyleGenerator);

        // Execute the async generator
        const result = await asyncGenerator();

        // The result should be the value from Q.return
        expect(result).toBe(3);
    });
});