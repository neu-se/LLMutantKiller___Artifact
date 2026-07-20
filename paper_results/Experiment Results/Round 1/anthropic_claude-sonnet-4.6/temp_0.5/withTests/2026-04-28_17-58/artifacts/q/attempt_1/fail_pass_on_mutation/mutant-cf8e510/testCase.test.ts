import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
    it("should not modify error.stack when promise has no stack property", async () => {
        Q.longStackSupport = true;

        try {
            // Create a deferred promise - it will have a stack because longStackSupport is true
            // We need a promise WITHOUT a stack property
            // Use Q.reject directly which creates a promise without .stack
            const error = new Error("test error");
            const originalStack = error.stack;

            // Create a promise that doesn't have a .stack property
            // Q.reject creates a rejection promise that doesn't go through defer()
            // so it won't have .stack set by the longStackSupport code
            const rejectedPromise = Q.reject(error);

            // Manually remove stack from the promise to simulate no stack
            // The key: in the mutated code, if promise.stack is falsy but error is object,
            // the condition is still entered. In original, it's not.
            // We need a promise with no .stack
            delete (rejectedPromise as any).stack;

            let caughtError: Error | null = null;

            await rejectedPromise.then(null, function(e: Error) {
                caughtError = e;
            });

            // In original: promise.stack is falsy -> condition false -> error.stack unchanged
            // In mutated: promise.stack is falsy but error is object -> condition true ->
            //   the code tries to build long stack trace, potentially appending to error.stack
            expect(caughtError).not.toBeNull();
            expect((caughtError as unknown as Error).stack).toBe(originalStack);
        } finally {
            Q.longStackSupport = false;
        }
    });
});