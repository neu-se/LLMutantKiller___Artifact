import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process object correctly", () => {
        // Check if process is an object
        expect(typeof global.process).toBe("object");

        // Create a promise that is resolved with a value
        const promise = Q(10);

        // Check if the promise is fulfilled
        expect(promise.isFulfilled()).toBe(true);

        // Check if the promise's value is correct
        promise.then((value: any) => {
            expect(value).toBe(10);
        });
    });
});