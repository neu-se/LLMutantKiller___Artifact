import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf shim behavior via unhandled rejection tracking", () => {
    it("should correctly track and untrack rejections using array_indexOf", async () => {
        // Reset state
        Q.resetUnhandledRejections();
        
        // Create a rejected promise
        const error = new Error("test rejection");
        const rejectedPromise = Q.reject(error);
        
        // Handle the rejection to trigger untrackRejection which uses array_indexOf
        const handledPromise = rejectedPromise.then(null, function(err) {
            return "handled: " + err.message;
        });
        
        // Wait for the promise chain to settle
        const result = await handledPromise;
        
        // After handling, unhandled reasons should be empty
        expect(result).toBe("handled: test rejection");
        
        // The unhandled rejections should have been cleared
        const reasons = Q.getUnhandledReasons();
        expect(reasons.length).toBe(0);
    });
});