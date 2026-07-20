import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the fulfillment value for fulfilled promises and promise for rejected", () => {
        // Test fulfilled promise
        const fulfilledPromise = Q(42);
        expect(fulfilledPromise.valueOf()).toBe(42);

        // Test rejected promise - this is where the mutation affects behavior
        const error = new Error("test error");
        const rejectedPromise = Q.reject(error);
        const rejectedResult = rejectedPromise.valueOf();

        // In original code: rejected promises return themselves
        // In mutated code: all promises return themselves (due to if(true))
        expect(rejectedResult).toBe(rejectedPromise);

        // This additional check will fail in mutated code because
        // the valueOf implementation will be wrong for fulfilled promises too
        const anotherFulfilled = Q("test");
        expect(anotherFulfilled.valueOf()).toBe("test");
    });
});