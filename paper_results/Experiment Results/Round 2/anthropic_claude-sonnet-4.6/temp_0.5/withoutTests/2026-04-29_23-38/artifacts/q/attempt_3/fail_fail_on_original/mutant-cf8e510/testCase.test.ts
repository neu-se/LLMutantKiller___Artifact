import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not add stack jump separator when error already has one", async () => {
        Q.longStackSupport = true;

        const STACK_JUMP_SEPARATOR = "From previous event:";
        const error = new Error("test");
        // Pre-inject the separator - original code checks for this and skips
        error.stack = "Error: test\n    at Object.<anonymous> (test.js:1:1)\n" + 
                      STACK_JUMP_SEPARATOR + "\n    at previous (test.js:2:1)";
        const originalStack = error.stack;

        // We need a promise chain so promise.stack gets set
        const deferred = Q.defer();
        
        let capturedStack: string | undefined;
        const p = deferred.promise.then(null, function(e: any) {
            capturedStack = e.stack;
        });

        deferred.reject(error);
        await p;

        // Original: indexOf check prevents double-processing, stack stays same
        // Mutated: short-circuit means indexOf check is skipped, separator added again
        const separatorCount = (capturedStack || "").split(STACK_JUMP_SEPARATOR).length - 1;
        expect(separatorCount).toBe(1);
    });
});