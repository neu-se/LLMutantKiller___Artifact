// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise rejection behavior", () => {
    it("should correctly handle thrown errors in progress callbacks", async () => {
        let errorThrown = false;
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Set up a progress callback that throws an error
        deferred.promise.progress(() => {
            throw error;
        });

        // Set up a global error handler to catch the thrown error
        Q.onerror = (err) => {
            errorThrown = true;
        };

        // Trigger the progress callback
        deferred.notify();

        // Wait a bit to ensure the error handler has time to execute
        await new Promise(resolve => setTimeout(resolve, 10));

        // Verify that the error was thrown and caught
        expect(errorThrown).toBe(true);
    });
});