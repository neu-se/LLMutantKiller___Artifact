describe("makeStackTraceLong function", () => {
    it("should correctly handle error stack traces", () => {
        var error = new Error();
        var promise = { stack: "", source: null };
        var stacks = [];
        for (var p = promise; p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);
        var concatedStacks = stacks.join("\nFrom previous event:\n");
        expect(concatedStacks).toContain("Error");
        expect(promise.source).toBeNull();
    });
});