describe("Q", () => {
    it("should track unhandled rejections", () => {
        const Q = require("../../../../../../../q.js");
        Q.resetUnhandledRejections();
        const promise = Q.reject("Test rejection");
        Q.nextTick(() => {
            expect(Q.getUnhandledReasons().length).toBe(1);
        });
    });
});