describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const Q = require('../../../../q.js');
        const promise = Q(5);
        expect(promise.isFulfilled()).toBe(true);
        const isNodeJS = typeof process === "object" && process && process.env && process.env.Q_DEBUG;
        expect(isNodeJS).toBe(false);
    });
});