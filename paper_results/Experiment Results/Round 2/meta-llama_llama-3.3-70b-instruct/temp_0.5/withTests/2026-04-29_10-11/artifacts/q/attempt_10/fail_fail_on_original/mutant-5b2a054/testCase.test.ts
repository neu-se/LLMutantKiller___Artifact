describe("q", () => {
    it("should handle unhandled rejection in browsers", () => {
        const Q = require('../../../../q.js');
        const error = new Error("Test error");
        const promise = Q.reject(error);
        const originalOnError = Q.onerror;
        Q.onerror = jest.fn();
        promise.then(null, () => {
            throw error;
        });
        expect(Q.onerror).toHaveBeenCalledTimes(1);
        Q.onerror = originalOnError;
    });
});