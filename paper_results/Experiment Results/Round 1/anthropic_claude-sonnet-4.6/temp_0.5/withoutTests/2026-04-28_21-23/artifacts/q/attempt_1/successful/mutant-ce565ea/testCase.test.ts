import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf for fulfilled state", () => {
    it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
        // Create a fulfilled promise using Q.fulfill
        const expectedValue = { answer: 42 };
        const fulfilledPromise = Q.fulfill(expectedValue);
        
        // In the original code, valueOf() on a fulfilled promise returns the value
        // In the mutated code, valueOf() always returns the promise itself (due to `if (true)`)
        const result = fulfilledPromise.valueOf();
        
        // The result should be the actual value, not the promise
        expect(result).toBe(expectedValue);
        expect(result).not.toBe(fulfilledPromise);
    });
});