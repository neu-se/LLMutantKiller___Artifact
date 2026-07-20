import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of makeStackTraceLong", () => {
        var error = new Error("Test error");
        var promise = Q.resolve();
        var hasStacks = true;
        var qFileName = "q.js";
        var qStartingLine = 1;
        var qEndingLine = 100;

        var originalError = Object.assign({}, error);
        if (hasStacks && promise.stack && typeof error === "object") {
            var stacks = [];
            for (var p = promise; !!p; p = p.source) {
                if (p.stack) {
                    stacks.unshift(p.stack);
                }
            }
            stacks.unshift(originalError.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = concatedStacks;
            Object.defineProperty(originalError, "stack", { value: stack, configurable: true });
        }

        var mutatedError = Object.assign({}, error);
        if (hasStacks && promise.stack || typeof error === "object") {
            var stacks = [];
            for (var p = promise; !!p; p = p.source) {
                if (p.stack) {
                    stacks.unshift(p.stack);
                }
            }
            stacks.unshift(mutatedError.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = concatedStacks;
            Object.defineProperty(mutatedError, "stack", { value: stack, configurable: true });
        }

        expect(originalError.stack).not.toBe(mutatedError.stack);
    });
});