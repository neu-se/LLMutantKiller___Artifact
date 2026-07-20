describe("Q function behavior", () => {
    it("should preserve the original behavior when given a value", () => {
        const Q = require('../../../../q.js');
        expect(Q.nextTick).toBeInstanceOf(Function);
        const nextTickSpy = jest.spyOn(Q, 'nextTick');
        Q.nextTick(() => {});
        expect(nextTickSpy).toHaveBeenCalledTimes(1);
        expect(Q.nextTick.toString()).toContain('process.nextTick');
    });
});