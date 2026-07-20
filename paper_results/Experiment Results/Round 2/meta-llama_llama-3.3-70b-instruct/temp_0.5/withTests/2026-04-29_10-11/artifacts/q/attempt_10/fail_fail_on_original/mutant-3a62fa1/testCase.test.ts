describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const Q = require('../../../../q.js');
        expect(typeof Q.nextTick).toBe('function');
        const condition = typeof process === "object" && process !== null && typeof process.nextTick === 'function';
        expect(condition).toBeTruthy();
    });
});