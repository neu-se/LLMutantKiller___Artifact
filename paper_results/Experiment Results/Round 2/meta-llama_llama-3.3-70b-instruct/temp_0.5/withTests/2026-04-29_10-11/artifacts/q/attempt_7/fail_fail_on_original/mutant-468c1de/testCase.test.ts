describe("makeStackTraceLong function", () => {
    it("should correctly handle error stack traces", () => {
        var error = new Error();
        var promise = { stack: "" };
        promise.stackCounter = 1;
        error.__minimumStackCounter__ = 0;
        var stacks = [];
        for (var p = promise; p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);
        var concatedStacks = stacks.join("\nFrom previous event:\n");
        var stack = concatedStacks;
        expect(stack).toContain("makeStackTraceLong");
    });
});