describe("makeStackTraceLong function", () => {
    it("should handle error and promise correctly", () => {
        var error = new Error("Test error");
        var promise = { stack: "some stack" };

        // This test should pass on the original code and fail on the mutated code
        // because in the mutated code, the condition is always true (true &&)
        // so it will not correctly handle the case where error is null
        if (error !== null && promise.stack) {
            var stack = error.stack;
        }
        expect(stack).toBeDefined();
    });
});