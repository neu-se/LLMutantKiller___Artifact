describe("Q", () => {
    it("should test done method with fulfilled promise", () => {
        const Q = require('../../../../../q.js');
        const promise = Q(5);
        const onFulfilled = jest.fn();
        const onRejected = jest.fn();
        const onProgress = jest.fn();

        promise.done(onFulfilled, onRejected, onProgress);

        expect(onFulfilled).toHaveBeenCalledTimes(1);
        expect(onRejected).toHaveBeenCalledTimes(0);
        expect(onProgress).toHaveBeenCalledTimes(0);
    });

    it("should test done method with rejected promise", () => {
        const Q = require('../../../../../q.js');
        const promise = Q.reject("error");
        const onFulfilled = jest.fn();
        const onRejected = jest.fn();
        const onProgress = jest.fn();

        promise.done(onFulfilled, onRejected, onProgress);

        expect(onFulfilled).toHaveBeenCalledTimes(0);
        expect(onRejected).toHaveBeenCalledTimes(1);
        expect(onProgress).toHaveBeenCalledTimes(0);
    });

    it("should test done method with no arguments", () => {
        const Q = require('../../../../../q.js');
        const promise = Q(5);
        expect(() => promise.done()).toThrowError();
    });
});