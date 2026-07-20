// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise prototype valueOf behavior", () => {
    it("should correctly handle pending promises with valueOf", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        // The mutation changes the condition from `if (inspect)` to `if (false)`
        // This means the valueOf method won't be properly set up for pending promises
        // In the original code, pending promises should return themselves when valueOf is called
        expect(promise.valueOf()).toBe(promise);

        // Resolve the promise and check again
        deferred.resolve(42);
        return promise.then((value: any) => {
            // After resolution, valueOf should return the resolved value
            expect(promise.valueOf()).toBe(42);
        });
    });
});