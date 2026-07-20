const Q = require('./q.js');

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.trackUnhandledRejections = true;
        Q.resetUnhandledRejections();
        const promise = Q.reject("Test rejection");
        promise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});