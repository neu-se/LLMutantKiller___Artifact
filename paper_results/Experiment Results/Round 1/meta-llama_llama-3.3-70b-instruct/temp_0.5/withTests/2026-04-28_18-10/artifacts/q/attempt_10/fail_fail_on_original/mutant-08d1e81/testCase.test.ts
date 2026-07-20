describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const Q = require('../../q');
        const promise = Q.reject(new Error("Test error"));
        expect(promise.isRejected()).toBe(true);
        const originalProcessEmit = process.emit;
        const spy = jest.fn();
        process.emit = spy;
        Q.nextTick(function () {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), expect.any(Object));
        });
        process.emit = originalProcessEmit;
    });
});