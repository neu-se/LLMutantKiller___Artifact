import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the fulfilled value when valueOf is called on a fulfilled promise", () => {
        // Create a fulfilled promise using Q.fulfill (via Q())
        const fulfilledPromise = Q(42);
        
        // In the original code, valueOf on a fulfilled promise returns the value (42)
        // In the mutated code, valueOf returns the promise itself (because !== "pending" is true)
        const result = fulfilledPromise.valueOf();
        
        // The result should be the primitive value 42, not a promise object
        expect(result).toBe(42);
        expect(result instanceof Q.makePromise).toBe(false);
    });
});