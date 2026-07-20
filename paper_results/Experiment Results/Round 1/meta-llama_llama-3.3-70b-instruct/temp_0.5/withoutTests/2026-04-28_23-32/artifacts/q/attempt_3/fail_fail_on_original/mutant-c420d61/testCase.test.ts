import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle makeStackTraceLong function", () => {
        const error = new Error("Test error");
        Error.captureStackTrace(error);
        const promise = {
            stack: "at foo (node.js:123:45)\n" +
                "at bar (q.js:10:20)",
            stackCounter: 1,
            source: null,
        };
        const makeStackTraceLongOriginal = function (error, promise) {
            if (q.hasStacks &&
                promise.stack &&
                typeof error === "object" &&
                error !== null &&
                error.stack
            ) {
                const stacks = [];
                for (let p = promise; !!p; p = p.source) {
                    if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                        q.object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
                        stacks.unshift(p.stack);
                    }
                }
                stacks.unshift(error.stack);
                const concatedStacks = stacks.join("\n" + q.STACK_JUMP_SEPARATOR + "\n");
                const stack = q.filterStackString(concatedStacks);
                q.object_defineProperty(error, "stack", { value: stack, configurable: true });
            }
        };
        const makeStackTraceLongMutated = function (error, promise) {
            if (q.hasStacks &&
                promise.stack &&
                typeof error === "object" &&
                error !== null &&
                error.stack
            ) {
                const stacks = [];
                for (let p = promise; !!p; p = p.source) {
                    if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                        q.object_defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
                        stacks.unshift(p.stack);
                    }
                }
                stacks.unshift(error.stack);
                const concatedStacks = stacks.join("\n" + q.STACK_JUMP_SEPARATOR + "\n");
                const stack = concatedStacks;
                q.object_defineProperty(error, "stack", { value: stack, configurable: true });
            }
        };
        makeStackTraceLongOriginal(error, promise);
        expect(error.stack).toBe("Error: Test error\n" +
            q.STACK_JUMP_SEPARATOR + "\n" +
            "at foo (node.js:123:45)");
        makeStackTraceLongMutated(error, promise);
        expect(error.stack).toBe("Error: Test error\n" +
            q.STACK_JUMP_SEPARATOR + "\n" +
            "at foo (node.js:123:45)\n" +
            q.STACK_JUMP_SEPARATOR + "\n" +
            "at bar (q.js:10:20)");
    });
});