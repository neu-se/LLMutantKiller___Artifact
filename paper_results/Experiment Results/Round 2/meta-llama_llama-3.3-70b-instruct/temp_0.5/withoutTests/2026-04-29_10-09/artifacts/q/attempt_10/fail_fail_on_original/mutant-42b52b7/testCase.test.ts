describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const Q = require('./q');
        const promise = Q.defer().promise;
        const error = new Error("Test error");
        Q.untrackRejection(promise);
        const originalProcessEmit = global.process && global.process.emit;
        const emitSpy = jest.fn();
        if (global.process) {
            global.process.emit = emitSpy;
        }
        Q.nextTick.runAfter(() => {
            throw error;
        });
        if (global.process) {
            expect(emitSpy).toHaveBeenCalledTimes(1);
            expect(emitSpy).toHaveBeenCalledWith("rejectionHandled", error, promise);
            global.process.emit = originalProcessEmit;
        }
    });
});