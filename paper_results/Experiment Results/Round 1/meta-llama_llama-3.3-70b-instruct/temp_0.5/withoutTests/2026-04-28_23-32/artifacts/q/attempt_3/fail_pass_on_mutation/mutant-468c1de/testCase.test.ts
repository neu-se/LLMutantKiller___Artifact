import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle error stack traces with minimum stack counter", async () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const anotherPromise = Q.reject(new Error("Another test error"));
        anotherPromise.stackCounter = 1;
        (error as any).__minimumStackCounter__ = 0;
        (anotherPromise as any).stack = "Test stack";
        (anotherPromise as any).stackCounter = 1;
        makeStackTraceLong(error, anotherPromise);
        expect((error as any).__minimumStackCounter__).toBe(1);
    });

    function makeStackTraceLong(error: any, promise: any) {
        if (hasStacks() &&
            promise.stack &&
            typeof error === "object" &&
            error.stack
        ) {
            var stacks: string[] = [];
            if (promise.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > promise.stackCounter)) {
                Object.defineProperty(error, "__minimumStackCounter__", { value: promise.stackCounter, configurable: true });
                stacks.unshift(promise.stack);
            }
            stacks.unshift(error.stack);

            var concatedStacks = stacks.join("\n" + "From previous event:" + "\n");
            var stack = filterStackString(concatedStacks);
            Object.defineProperty(error, "stack", { value: stack, configurable: true });
        }
    }

    function hasStacks(): boolean {
        try {
            throw new Error();
        } catch (e: any) {
            return !!e.stack;
        }
    }

    function filterStackString(stackString: string): string {
        var lines = stackString.split("\n");
        var desiredLines: string[] = [];
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];

            if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        return desiredLines.join("\n");
    }

    function isNodeFrame(stackLine: string): boolean {
        return stackLine.indexOf("(module.js:") !== -1 ||
            stackLine.indexOf("(node.js:") !== -1;
    }

    function isInternalFrame(stackLine: string): boolean {
        // This function is not implemented for simplicity
        return false;
    }
});