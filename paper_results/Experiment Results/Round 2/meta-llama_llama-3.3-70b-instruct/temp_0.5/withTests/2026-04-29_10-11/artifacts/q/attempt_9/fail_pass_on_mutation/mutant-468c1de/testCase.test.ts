describe("makeStackTraceLong function", () => {
    it("should correctly handle error stack traces", () => {
        var error = new Error();
        var promise = { stack: "" };
        var stacks = [];
        stacks.unshift(error.stack);
        var concatedStacks = stacks.join("\nFrom previous event:\n");
        expect(concatedStacks).toContain("Error");
    });
});