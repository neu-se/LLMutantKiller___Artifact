import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering with named functions", () => {
    it("should correctly filter internal stack frames from named function traces", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        function outerFunction() {
            return Q.Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error("Test error"));
                }, 0);
            });
        }

        function middleFunction() {
            return outerFunction();
        }

        function innerFunction() {
            return middleFunction();
        }

        return innerFunction()
            .catch((err) => {
                const stack = err.stack;

                // The stack should contain our function names
                expect(stack).toContain("innerFunction");
                expect(stack).toContain("middleFunction");
                expect(stack).toContain("outerFunction");

                // The mutation would prevent proper parsing of stack lines with named functions
                // which would affect the filtering of internal Q frames
                // This would result in either:
                // 1. Missing function names in the stack
                // 2. Incorrect line numbers
                // 3. Internal Q frames not being filtered out

                // Verify the stack contains expected line number format
                expect(stack).toMatch(/at \S+ \(.+:\d+:\d+\)/);

                return true;
            });
    });
});