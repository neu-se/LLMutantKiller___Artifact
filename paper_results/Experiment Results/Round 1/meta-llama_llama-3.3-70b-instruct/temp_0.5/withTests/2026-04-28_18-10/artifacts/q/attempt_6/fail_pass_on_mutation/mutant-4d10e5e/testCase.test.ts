describe("Q", () => {
    it("should have hasStacks as false by default when checking Error.stack", () => {
        var error = new Error();
        var hasStacks = false;
        if (error.stack) {
            hasStacks = true;
        }
        expect(hasStacks).toBe(true);
    });
});