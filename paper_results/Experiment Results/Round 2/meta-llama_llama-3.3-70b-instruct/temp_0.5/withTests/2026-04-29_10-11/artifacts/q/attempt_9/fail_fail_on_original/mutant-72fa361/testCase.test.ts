describe("makeStackTraceLong function", () => {
    it("should modify the error stack trace to include the promise chain", () => {
        const Q = require('../../../../../q.js');
        Q.longStackSupport = true;

        const error = new Error("Test error");
        const promise = Q.reject(error);

        promise.catch((err: any) => {
            expect(err.stack).toContain("Promise");
        });
    });
});