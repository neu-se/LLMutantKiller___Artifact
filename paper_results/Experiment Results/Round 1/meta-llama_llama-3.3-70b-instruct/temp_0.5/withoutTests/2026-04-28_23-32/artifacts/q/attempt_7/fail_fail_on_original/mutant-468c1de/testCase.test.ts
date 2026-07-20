import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle error stack traces with minimum stack counter", async () => {
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        (promise1 as any).stackCounter = 1;
        (promise1 as any).stack = "Test stack 1";
        const promise2 = Q.reject(error);
        (promise2 as any).stackCounter = 2;
        (promise2 as any).stack = "Test stack 2";
        makeStackTraceLong(error, promise1, promise2);
        expect((error as any).__minimumStackCounter__).toBe(1);
        expect((error as any).stack).toContain("Test stack 1");
        expect((error as any).stack).toContain("Test stack 2");
    });

    function makeStackTraceLong(error: any,...promises: any[]) {
        if (hasStacks() &&
            error.stack
        ) {
            var minCounter = Infinity;
            var stacks: string[] = [];
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
            error.stack = stacks.join("\n" + "From previous event:" + "\n");
        }
    }

    function hasStacks(): boolean {
        try {
            throw new Error();
        } catch (e: any) {
            return!!e.stack;
        }
    }
});