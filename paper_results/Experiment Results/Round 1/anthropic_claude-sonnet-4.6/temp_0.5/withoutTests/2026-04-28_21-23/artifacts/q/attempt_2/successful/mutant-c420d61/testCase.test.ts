import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame stack filtering", () => {
    it("should filter out lines containing (node.js: from long stack traces", async () => {
        Q.longStackSupport = true;

        const nodeJsFrame = "    at Object.<anonymous> (node.js:101:10)";
        
        let capturedError: any = null;
        
        // We need makeStackTraceLong to be called, which happens in Promise.prototype.then's _rejected
        // It requires: hasStacks && promise.stack && typeof error === "object" && error !== null && error.stack
        // promise.stack is set when Q.longStackSupport && hasStacks in defer()
        
        await new Promise<void>((resolve) => {
            const d = Q.defer();
            
            // Chain through multiple .then() calls so promise.stack is set on the intermediate promise
            d.promise
                .then(function step1(v: any) { return v; })
                .then(function triggerRejection() {
                    const err = new Error("test error");
                    // Inject a node.js internal frame into the error's stack
                    err.stack = (err.stack || "") + "\n" + nodeJsFrame;
                    throw err;
                })
                .fail(function(err: any) {
                    capturedError = err;
                    resolve();
                });
            
            d.resolve("value");
        });
        
        expect(capturedError).not.toBeNull();
        expect(capturedError.stack).toBeDefined();
        
        // Original: isNodeFrame("    at Object.<anonymous> (node.js:101:10)") returns true
        //           so this line gets filtered OUT → stack does NOT contain "(node.js:"
        // Mutated:  isNodeFrame always returns false
        //           so this line is NOT filtered → stack DOES contain "(node.js:"
        expect(capturedError.stack).not.toContain("(node.js:");
    });
});