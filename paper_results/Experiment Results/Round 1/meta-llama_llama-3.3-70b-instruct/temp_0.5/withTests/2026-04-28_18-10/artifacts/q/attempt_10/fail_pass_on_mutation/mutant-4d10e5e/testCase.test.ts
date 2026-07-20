describe("Error Stack", () => {
    it("should have a stack trace", () => {
        var error = new Error();
        expect(error.stack).toBeDefined();
    });
});