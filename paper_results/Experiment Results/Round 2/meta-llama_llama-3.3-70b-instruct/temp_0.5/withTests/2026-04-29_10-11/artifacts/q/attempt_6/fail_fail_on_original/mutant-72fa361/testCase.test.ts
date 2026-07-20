describe("makeStackTraceLong function", () => {
    it("should modify the error stack trace", () => {
        const Q = require('../../../../../q.js');
        Q.longStackSupport = true;

        const error = new Error("Test error");
        const promise = Q.reject(error);

        const originalStackTrace = error.stack;
        promise.catch((err: any) => {
            expect(err.stack).not.toBe(originalStackTrace);
        });
    });
});