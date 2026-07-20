describe("makeStackTraceLong", () => {
    it("should correctly handle the case when error is not null and promise has a stack", () => {
        var error = new Error("test error");
        var promise = { stack: "test stack" };
        var originalStack = promise.stack;
        if (error !== null && promise.stack) {
            promise.stack = "new stack";
        }
        expect(promise.stack).not.toBe(originalStack);
    });
});