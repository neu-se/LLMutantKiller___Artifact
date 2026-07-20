import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly handle progress notifications using array_indexOf", () => {
        // This test targets the array_indexOf mutation by creating a scenario
        // where Q's progress notification system uses array_indexOf internally
        // The mutation changes `if (this[i] === value)` to `if (false)`
        // which would break progress listener management

        const deferred = Q.defer();
        let progressValueReceived: number | null = null;

        // Register a progress listener
        Q.progress(deferred.promise, (value: number) => {
            progressValueReceived = value;
        });

        // Trigger progress notification
        Q.nextTick(() => {
            deferred.notify(42);
        });

        // Give time for the progress notification to be processed
        return Q.delay(10).then(() => {
            // The mutation would prevent the progress listener from being found
            // because array_indexOf would always return -1
            // So progressValueReceived would remain null
            expect(progressValueReceived).toBe(42);
        });
    });
});