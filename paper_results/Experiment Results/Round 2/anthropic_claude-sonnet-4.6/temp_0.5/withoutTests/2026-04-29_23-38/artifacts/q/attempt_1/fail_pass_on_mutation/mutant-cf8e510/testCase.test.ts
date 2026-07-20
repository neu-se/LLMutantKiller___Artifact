import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
    it("should not throw when error is an object but promise has no stack property", async () => {
        // The mutation changes && to || in makeStackTraceLong condition
        // Original: hasStacks && promise.stack && typeof error === "object"
        // Mutated:  hasStacks && promise.stack || typeof error === "object"
        // 
        // With the mutated code, if error is an object (which it usually is),
        // the condition becomes true even when promise.stack is undefined,
        // causing the function to try to access error.stack.split("\n") on a 
        // promise without a stack, potentially causing issues.
        
        Q.longStackSupport = false; // Disable long stacks so promise.stack is not set
        
        const error = new Error("test error");
        
        // Create a rejected promise and catch it
        let caughtError: Error | null = null;
        
        await Q.reject(error)
            .then(null, function(e: Error) {
                caughtError = e;
                return null;
            });
        
        // The error should be the same error object
        expect(caughtError).toBe(error);
        expect((caughtError as unknown as Error).message).toBe("test error");
    });
});