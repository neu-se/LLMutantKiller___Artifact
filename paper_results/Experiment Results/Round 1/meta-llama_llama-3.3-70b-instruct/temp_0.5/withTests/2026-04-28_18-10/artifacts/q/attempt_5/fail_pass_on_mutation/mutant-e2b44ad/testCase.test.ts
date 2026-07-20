import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process object correctly", () => {
        // Create a promise that is resolved with a value
        const promise = Q(10);

        // Check if the promise is fulfilled
        expect(promise.isFulfilled()).toBe(true);

        // Check if the promise's value is correct
        promise.then((value: any) => {
            expect(value).toBe(10);
        });

        // Set process to a non-object value
        const originalProcess = global.process;
        global.process = "";

        try {
            // Create another promise that is resolved with a value
            const anotherPromise = Q(10);

            // Check if the promise is fulfilled
            expect(anotherPromise.isFulfilled()).toBe(true);

            // Check if the promise's value is correct
            anotherPromise.then((value: any) => {
                expect(value).toBe(10);
            });
        } finally {
            // Restore the original process
            global.process = originalProcess;
        }
    });
});