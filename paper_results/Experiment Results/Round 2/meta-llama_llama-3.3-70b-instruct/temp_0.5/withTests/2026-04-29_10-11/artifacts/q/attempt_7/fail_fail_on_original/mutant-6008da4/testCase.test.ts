describe("Q.nextTick", () => {
    it("should work correctly", () => {
        const originalCodeIsNodeJS = typeof process !== 'undefined' && process.nextTick;
        if (originalCodeIsNodeJS) {
            // If we're in a Node.js environment, Q.nextTick should use process.nextTick
            expect(Q.nextTick.toString()).toContain('process.nextTick');
        } else {
            // If we're not in a Node.js environment, Q.nextTick should not use process.nextTick
            expect(Q.nextTick.toString()).not.toContain('process.nextTick');
        }
    });
});