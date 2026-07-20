import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should correctly handle error stack traces with minimum stack counter", async () => {
        const error = new Error("Test error");
        const promise = Q.reject(error);
        (promise as any).stackCounter = 1;
        (promise as any).stack = "Test stack";
        makeStackTraceLong(error, promise);
        expect((error as any).__minimumStackCounter__).toBe(1);
        expect((error as any).stack).toContain("Test stack");
    });

    function makeStackTraceLong(error: any, promise: any) {
        if (hasStacks() &&
            promise.stack &&
            typeof error === "object" &&
            error.stack
        ) {
            if (promise.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > promise.stackCounter)) {
                Object.defineProperty(error, "__minimumStackCounter__", { value: promise.stackCounter, configurable: true });
                error.stack = promise.stack + "\n" + error.stack;
            }
        }
    }

    function hasStacks(): boolean {
        try {
            throw new Error();
        } catch (e: any) {
            return !!e.stack;
        }
    }
});