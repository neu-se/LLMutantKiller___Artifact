// Assuming the q.js file is in the same directory as this test file
const Q = require('./q.js');

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.trackUnhandledRejections = true;
        Q.resetUnhandledRejections();
        const promise = Q.reject("Test rejection");
        expect(Q.getUnhandledReasons().length).toBe(1);
        promise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});