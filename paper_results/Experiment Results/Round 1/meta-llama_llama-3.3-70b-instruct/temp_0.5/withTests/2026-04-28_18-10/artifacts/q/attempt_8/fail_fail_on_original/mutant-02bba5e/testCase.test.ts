describe("makeStackTraceLong", () => {
    it("should correctly handle the case when error is null and promise has a stack", () => {
        var error = null;
        var promise = { stack: "test stack" };
        makeStackTraceLong(error, promise);
        expect(promise.stack).toBeDefined();
    });
});