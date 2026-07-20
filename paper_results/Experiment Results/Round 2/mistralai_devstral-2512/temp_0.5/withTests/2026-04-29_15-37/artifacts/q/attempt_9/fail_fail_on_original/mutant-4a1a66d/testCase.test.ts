// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator behavior with explicit StopIteration check", () => {
    it("should use ES6 path when StopIteration is defined", async () => {
        // This test specifically targets the mutation where the condition
        // `typeof StopIteration === "undefined"` was changed to `true`
        // The original code should use ES6 path when StopIteration is defined
        // The mutation would always use SpiderMonkey path regardless

        // First verify the current environment
        const stopIterationDefined = typeof StopIteration !== "undefined";

        // Create an ES6 generator function
        function* es6Generator() {
            yield 1;
            return "ES6 Result";
        }

        // Use Q.async to wrap the generator
        const asyncGenerator = Q.async(es6Generator);
        const result = await asyncGenerator();

        // When StopIteration is defined, should use ES6 path
        if (stopIterationDefined) {
            expect(result).toBe("ES6 Result");
        }

        // Now test with a mock SpiderMonkey generator
        // This should only work when using the correct path
        function mockSpiderMonkeyGenerator() {
            let step = 0;
            return {
                next: function() {
                    if (step === 0) {
                        step++;
                        return 1;
                    } else {
                        // Throw a QReturnValue to simulate SpiderMonkey completion
                        throw new (Q as any).QReturnValue("SpiderMonkey Result");
                    }
                }
            };
        }

        // This should work on original code but fail on mutated code
        // because the mutation would incorrectly route it based on the changed condition
        const spiderAsyncGenerator = Q.async(mockSpiderMonkeyGenerator);
        const spiderResult = await spiderAsyncGenerator();
        expect(spiderResult).toBe("SpiderMonkey Result");
    });
});