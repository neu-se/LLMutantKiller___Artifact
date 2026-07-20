import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process object correctly", () => {
        // Set process to an empty string
        const originalProcess = global.process;
        global.process = "";

        try {
            // Create a promise that is resolved with a value
            const promise = Q(10);

            // Check if the promise is fulfilled
            expect(promise.isFulfilled()).toBe(true);

            // Check if the promise's value is correct
            promise.then((value: any) => {
                expect(value).toBe(10);
            });
        } finally {
            // Restore the original process
            global.process = originalProcess;
        }
    });
});