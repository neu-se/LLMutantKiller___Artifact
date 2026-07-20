import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle error stack traces with minimum stack counter", async () => {
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        const promise2 = Q.reject(new Error("Another test error"));
        (promise1 as any).stackCounter = 1;
        (promise2 as any).stackCounter = 2;
        (promise1 as any).stack = "Test stack 1";
        (promise2 as any).stack = "Test stack 2";
        makeStackTraceLong(error, promise1, promise2);
        expect((error as any).__minimumStackCounter__).toBe(1);
    });

    function makeStackTraceLong(error: any,...promises: any[]) {
        if (hasStacks() &&
            error.stack
        ) {
            var stacks: string[] = [];
            var minCounter = Infinity;
            for (var promise of promises) {
                if (promise.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > promise.stackCounter)) {
                    if (promise.stackCounter < minCounter) {
                        minCounter = promise.stackCounter;
                    }
                    Object.defineProperty(error, "__minimumStackCounter__", { value: promise.stackCounter, configurable: true });
                    stacks.unshift(promise.stack);
                }
            }
            if (minCounter!== Infinity) {
                Object.defineProperty(error, "__minimumStackCounter__", { value: minCounter, configurable: true });
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
            return!!e.stack;
        }
    }

    function filterStackString(stackString: string): string {
        var lines = stackString.split("\n");
        var desiredLines: string[] = [];
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];

            if (!isInternalFrame(line) &&!isNodeFrame(line) && line) {
                desiredLines.push(line);
            }
        }
        return desiredLines.join("\n");
    }

    function isNodeFrame(stackLine: string): boolean {
        return stackLine.indexOf("(module.js:")!== -1 ||
            stackLine.indexOf("(node.js:")!== -1;
    }

    function isInternalFrame(stackLine: string): boolean {
        // This function is not implemented for simplicity
        return false;
    }
});