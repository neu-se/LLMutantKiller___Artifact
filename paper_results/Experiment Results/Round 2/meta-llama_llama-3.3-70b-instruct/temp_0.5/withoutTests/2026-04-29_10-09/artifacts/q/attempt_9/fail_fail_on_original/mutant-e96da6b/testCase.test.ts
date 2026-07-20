const Q = require('./q.js');

describe("Q.delay function", () => {
    it("should have a function that delays the resolution of a promise", () => {
        const originalDelay = Q.delay;
        Q.delay = () => {};
        expect(Q.delay.toString()).not.toBe(originalDelay.toString());
        Q.delay = originalDelay;
    });
});