import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fail", () => {
    it("should reject with the given reason", () => {
        const promise = q.Q(10);
        const error = new Error("Test error");
        const rejectedPromise = promise.fail(() => { throw error; });
        return rejectedPromise.then(
            () => { expect(true).toBe(false); },
            (reason) => { expect(reason).toBe(error); }
        );
    });

    it("should not call the callback if the promise is rejected", () => {
        const promise = q.Q.reject("reason");
        const callback = jest.fn();
        const rejectedPromise = promise.fail(callback);
        return rejectedPromise.then(
            () => { expect(true).toBe(false); },
            () => { expect(callback).not.toHaveBeenCalled(); }
        );
    });

    it("should return a new promise", () => {
        const promise = q.Q(10);
        const rejectedPromise = promise.fail(() => { });
        expect(rejectedPromise).not.toBe(promise);
    });
});