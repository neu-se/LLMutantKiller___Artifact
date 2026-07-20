import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of makeStackTraceLong", () => {
        var error = new Error("Test error");
        var promise = Q();
        promise.stack = "Test stack";
        promise.stackCounter = 1;
        var hasStacks = true;
        var qFileName = "q.js";
        var qStartingLine = 1;
        var qEndingLine = 100;

        // Original code
        var originalError = Object.assign({}, error);
        if (hasStacks && promise.stack && typeof error === "object") {
            var stacks = [];
            for (var p = promise; !!p; p = p.source) {
                if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                    object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
                    stacks.unshift(p.stack);
                }
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = filterStackString(concatedStacks);
            object_defineProperty(error, "stack", { value: stack, configurable: true });
        }

        // Mutated code
        var mutatedError = Object.assign({}, error);
        if (hasStacks && promise.stack || typeof error === "object") {
            var stacks = [];
            for (var p = promise; !!p; p = p.source) {
                if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                    object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
                    stacks.unshift(p.stack);
                }
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = filterStackString(concatedStacks);
            object_defineProperty(error, "stack", { value: stack, configurable: true });
        }

        expect(originalError.stack).not.toBe(mutatedError.stack);
    });
});