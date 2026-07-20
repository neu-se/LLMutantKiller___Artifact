import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should correctly build a long stack trace", () => {
        var error = new Error("Test error");
        var promise = Q(1);
        var p = promise;
        for (var i = 0; i < 10; i++) {
            p = Q(p);
        }
        var stacks = [];
        if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
            error.__minimumStackCounter__ = p.stackCounter;
            stacks.unshift(p.stack);
        }
        stacks.unshift(error.stack);
        var concatedStacks = stacks.join("\nFrom previous event:\n");
        var stack = concatedStacks;
        error.stack = stack;
        expect(error.stack).toContain("makeStackTraceLong");
    });
});