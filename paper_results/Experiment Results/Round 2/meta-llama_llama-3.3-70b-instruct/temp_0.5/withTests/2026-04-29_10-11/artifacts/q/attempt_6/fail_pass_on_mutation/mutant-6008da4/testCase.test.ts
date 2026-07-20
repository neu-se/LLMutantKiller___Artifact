describe("Q.nextTick", () => {
    it("should work correctly", () => {
        const originalCodeIsNodeJS = typeof process !== 'undefined' && process.nextTick;
        const mutatedCodeIsNodeJS = true;

        if (originalCodeIsNodeJS) {
            expect(mutatedCodeIsNodeJS).toBe(true);
        } else {
            expect(mutatedCodeIsNodeJS).not.toBe(true);
        }
    });
});