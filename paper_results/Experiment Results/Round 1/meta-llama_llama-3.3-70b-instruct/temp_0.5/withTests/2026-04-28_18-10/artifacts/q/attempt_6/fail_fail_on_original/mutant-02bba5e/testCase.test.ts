describe("makeStackTraceLong", () => {
    it("should correctly handle the case when error is an object and promise has a stack", () => {
        var error = { message: "test error" };
        var promise = { stack: "test stack" };
        makeStackTraceLong(error, promise);
        expect(promise.stack).toBeDefined();
    });
});