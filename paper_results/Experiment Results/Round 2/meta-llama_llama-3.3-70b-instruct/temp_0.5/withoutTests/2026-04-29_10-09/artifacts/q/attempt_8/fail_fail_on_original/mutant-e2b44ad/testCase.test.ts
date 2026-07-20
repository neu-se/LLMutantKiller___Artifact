import { Q } from "./q.js";

describe("Q", () => {
    it("should pass on the original code and fail on the mutated code", () => {
        const promise = Q.resolve();
        const onFulfilled = jest.fn();
        const onRejected = jest.fn();
        const onProgress = jest.fn();
        promise.done(onFulfilled, onRejected, onProgress);
        expect(onFulfilled).toHaveBeenCalledTimes(1);
        expect(onRejected).toHaveBeenCalledTimes(0);
        expect(onProgress).toHaveBeenCalledTimes(0);
    });
});