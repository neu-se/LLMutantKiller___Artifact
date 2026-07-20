import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing with named function format", () => {
    it("should correctly parse stack lines with named function format", () => {
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

                // Force Q to process the stack trace by creating another error
                const newError = new Error("Second error");
                newError.stack = stack;

                const deferred2 = Q.defer();
                deferred2.reject(newError);

                return deferred2.promise.then(
                    () => {
                        throw new Error("Should not resolve");
                    },
                    (caughtError) => {
                        // Verify the stack trace was processed correctly
                        expect(caughtError.stack).toContain("innerFunction");
                        expect(caughtError.stack).toContain("middleFunction");
                        expect(caughtError.stack).toContain("outerFunction");
                        return true;
                    }
                );
            });
    });
});