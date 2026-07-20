describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const Q = require('./q');
        const isNodeJS = typeof process === "object" && process && process.domain;
        expect(Q.nextTick).toBeInstanceOf(Function);
        if (isNodeJS) {
            expect(Q.nextTick.name).toBe('nextTick');
        } else {
            expect(Q.nextTick.name).not.toBe('nextTick');
        }
    });
});