import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly remove progress listeners using array_indexOf", () => {
        // This test targets the array_indexOf mutation by creating a scenario
        // where Q needs to remove a progress listener from its internal array
        // The mutation changes `if (this[i] === value)` to `if (false)`
        // which would prevent finding and removing the listener

        const deferred = Q.defer();
        let progressCount = 0;

        // Add a progress listener
        const progressListener = () => { progressCount++; };
        Q.progress(deferred.promise, progressListener);

        // Trigger progress notification
        Q.nextTick(() => {
            deferred.notify();
        });

        // Give time for progress to be processed
        return Q.delay(10).then(() => {
            // First progress should have been received
            expect(progressCount).toBe(1);

            // Now remove the progress listener
            // This internally uses array_indexOf to find the listener
            const promise = deferred.promise;
            (promise as any).promiseDispatch(void 0, "when", [void 0, void 0]);

            // Trigger another progress notification
            Q.nextTick(() => {
                deferred.notify();
            });

            // Give time for second progress to be processed
            return Q.delay(10).then(() => {
                // The mutation would prevent the listener from being found and removed
                // so progressCount would be 2 instead of 1
                expect(progressCount).toBe(1);
            });
        });
    });
});