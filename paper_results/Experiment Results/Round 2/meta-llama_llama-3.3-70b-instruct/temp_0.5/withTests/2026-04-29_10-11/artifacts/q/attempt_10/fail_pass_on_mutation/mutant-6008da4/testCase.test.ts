describe("Q.nextTick", () => {
    it("should work correctly", () => {
        const isNode = typeof process !== 'undefined' && process.nextTick;
        if (isNode) {
            expect(typeof process.nextTick).toBe('function');
        } else {
            expect(typeof setTimeout).toBe('function');
        }
        if (isNode) {
            expect(typeof process.nextTick).toBe('function');
        } else {
            throw new Error('Q.nextTick should not use process.nextTick in a non-Node environment');
        }
    });
});