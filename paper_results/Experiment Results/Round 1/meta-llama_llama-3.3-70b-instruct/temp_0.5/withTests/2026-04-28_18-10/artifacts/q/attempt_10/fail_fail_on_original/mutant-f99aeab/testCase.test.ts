describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        let hasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            hasStacks = !!e.stack;
        }
        if (hasStacks) {
            expect(false).toBe(true);
        } else {
            expect(true).toBe(true);
        }
    });
});