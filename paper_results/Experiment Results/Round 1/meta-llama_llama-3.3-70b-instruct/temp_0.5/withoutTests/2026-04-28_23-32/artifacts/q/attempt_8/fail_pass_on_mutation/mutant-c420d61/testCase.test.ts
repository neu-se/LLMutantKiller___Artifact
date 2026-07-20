import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle makeStackTraceLong function", () => {
        const error = new Error("Test error");
        error.stack = "at foo (node.js:123:45)\n" +
            "at bar (q.js:10:20)";
        const promise = {
            stack: "at foo (node.js:123:45)\n" +
                "at bar (q.js:10:20)",
            stackCounter: 1,
            source: null,
        };
        const makeStackTraceLong = (error: Error, promise: any) => {
            if (promise.stack) {
                const stacks = [];
                stacks.unshift(promise.stack);
                stacks.unshift(error.stack);
                const concatedStacks = stacks.join("\nFrom previous event:\n");
                const stack = concatedStacks.replace(/at .* \(q\.js:\d+:\d+\)/g, '');
                error.stack = stack;
            }
        };
        makeStackTraceLong(error, promise);
        expect(error.stack.includes("q.js")).toBe(false);
    });
});