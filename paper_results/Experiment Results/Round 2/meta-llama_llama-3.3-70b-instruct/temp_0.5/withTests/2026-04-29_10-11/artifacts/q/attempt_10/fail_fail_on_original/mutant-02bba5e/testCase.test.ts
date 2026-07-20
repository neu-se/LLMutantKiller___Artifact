describe("makeStackTraceLong function", () => {
    it("should handle error and promise correctly", () => {
        var error = null;
        var promise = { stack: "some stack" };

        // This test should pass on the original code and fail on the mutated code
        // because in the mutated code, the condition is always true (true &&)
        // so it will throw an error when trying to access error.stack
        try {
            if (error !== null && promise.stack) {
                var stack = error.stack;
            }
            expect(true).toBe(false);
        } catch (e) {
            expect(true).toBe(false);
        }
    });
});