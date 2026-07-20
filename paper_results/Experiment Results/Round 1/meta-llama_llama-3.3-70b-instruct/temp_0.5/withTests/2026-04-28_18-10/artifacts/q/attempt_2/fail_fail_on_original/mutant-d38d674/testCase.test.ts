import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise", () => {
    it("should call the fallback function when the descriptor does not have the operation and fallback is undefined", () => {
        const descriptor = {};
        const promise = Q.makePromise(descriptor);
        promise.promiseDispatch(null, "non-existent-operation");
        // The original code should throw an error here, but the mutated code should not.
        expect(() => promise.promiseDispatch(null, "non-existent-operation")).toThrowError("Promise does not support operation: non-existent-operation");
    });
});