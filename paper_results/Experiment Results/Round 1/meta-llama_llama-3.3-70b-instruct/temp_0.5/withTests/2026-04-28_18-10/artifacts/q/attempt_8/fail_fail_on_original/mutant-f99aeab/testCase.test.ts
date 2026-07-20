describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        let hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        if (hasStacks) {
            expect(true).toBe(false);
        } else {
            expect(true).toBe(true);
        }
    });
});