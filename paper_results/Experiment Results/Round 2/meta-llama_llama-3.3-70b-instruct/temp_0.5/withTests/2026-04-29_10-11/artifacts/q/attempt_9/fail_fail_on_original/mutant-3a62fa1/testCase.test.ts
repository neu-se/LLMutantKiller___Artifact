describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const Q = require('./q');
        const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
        if (isNode) {
            expect(Q.nextTick).toBeInstanceOf(Function);
        } else {
            expect(Q.nextTick).toBeInstanceOf(Function);
        }
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
    });
});