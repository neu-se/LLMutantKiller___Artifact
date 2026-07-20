import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress listener error handling", () => {
    it("should handle errors in progress listeners when Q.onerror is defined", (done) => {
        const testError = new Error("test error");
        let errorHandled = false;

        // Set up error handler
        (Q as any).onerror = (error: Error) => {
            errorHandled = true;
            expect(error).toBe(testError);
            done();
        };

        const deferred = Q.defer();
        deferred.promise.then(
            () => {},
            () => {},
            () => {
                throw testError;
            }
        );

        deferred.notify();

        // Verify error was handled
        setTimeout(() => {
            if (!errorHandled) {
                done(new Error("Expected error to be handled"));
            }
        }, 50);
    });
});