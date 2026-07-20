describe('captureLine', () => {
    it('should return a value when hasStacks is true', () => {
        const originalHasStacks = (global as any).hasStacks;
        (global as any).hasStacks = true;
        const result = captureLine();
        expect(result).not.toBeNull();
        (global as any).hasStacks = originalHasStacks;
    });
});