import { Q } from "../../../q.js";

describe("Q.makePromise", () => {
    it("should call the fallback function when the descriptor does not have the operation and fallback is undefined", () => {
        const descriptor = {};
        const promise = Q.makePromise(descriptor);
        promise.promiseDispatch(null, "non-existent-operation", []);
        expect(promise.inspect().state).toBe("rejected");
        expect(promise.inspect().reason.message).toBe("Promise does not support operation: non-existent-operation");
    });
});