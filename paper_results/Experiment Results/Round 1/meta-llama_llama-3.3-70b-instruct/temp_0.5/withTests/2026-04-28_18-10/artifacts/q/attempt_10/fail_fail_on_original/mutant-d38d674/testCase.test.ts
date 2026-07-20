import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise", () => {
    it("should not call the fallback function when the descriptor does not have the operation and fallback is not undefined", () => {
        const descriptor = {};
        const fallback = jest.fn();
        const promise = Q.makePromise(descriptor, fallback);
        promise.promiseDispatch(null, "non-existent-operation", []);
        expect(fallback).toHaveBeenCalledTimes(1);
    });
});