const Q = require('../../../../q');

describe("Q", () => {
    it("should track unhandled rejections", () => {
        Q.trackUnhandledRejections = true;
        Q.resetUnhandledRejections();
        const promise = Q.reject("Test rejection");
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons().length).toBe(1);
            promise.catch(() => {});
            Q.nextTick(() => {
                expect(Q.getUnhandledReasons().length).toBe(0);
            });
        });
    });
});