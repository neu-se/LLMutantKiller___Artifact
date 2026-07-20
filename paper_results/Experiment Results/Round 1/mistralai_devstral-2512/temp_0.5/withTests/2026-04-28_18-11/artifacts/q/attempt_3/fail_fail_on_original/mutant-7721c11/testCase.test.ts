import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find the index of a value in an array using Q's internal operations", () => {
        // Create a scenario where Q's internal array_indexOf is used
        // The mutation changes the condition from `if (this[i] === value)` to `if (false)`
        // which will cause indexOf to always return -1

        // We'll test this by using Q.all with an array and checking progress notifications
        // which internally uses array_indexOf
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promises = [deferred1.promise, deferred2.promise];

        let progressCalled = false;

        const result = Q.all(promises).then(
            () => {
                // Should not reach here since we're testing progress
                return false;
            },
            undefined,
            (progress: any) => {
                // This progress handler should be called
                // The internal implementation uses array_indexOf to manage progress listeners
                progressCalled = true;
            }
        );

        // Trigger progress notification
        Q.nextTick(() => {
            deferred1.notify("test");
        });

        return result.then(() => {
            // The mutation would prevent progress listeners from being found
            // and thus progressCalled would remain false
            expect(progressCalled).toBe(true);
        });
    });
});