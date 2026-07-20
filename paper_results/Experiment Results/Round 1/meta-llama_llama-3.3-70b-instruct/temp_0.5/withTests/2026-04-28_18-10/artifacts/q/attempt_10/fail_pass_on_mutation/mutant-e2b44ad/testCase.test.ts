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

        // Check if process is an object and has a domain property
        if (typeof global.process === "object" && global.process !== null) {
            expect(Object.prototype.hasOwnProperty.call(global.process, 'domain')).toBe(true);
        }
    });
});