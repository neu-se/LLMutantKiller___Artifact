import { Q } from '../../../q.js';

describe("Q", () => {
    it("should correctly handle the done method", () => {
        const promise = Q();
        const onFulfilled = jest.fn();
        const onRejected = jest.fn();
        const onProgress = jest.fn();

        promise.done(onFulfilled, onRejected, onProgress);

        expect(onFulfilled).toHaveBeenCalledTimes(1);
        expect(onRejected).toHaveBeenCalledTimes(0);
        expect(onProgress).toHaveBeenCalledTimes(0);
    });
});