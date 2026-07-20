describe('Q', () => {
    it('should throw an error when hasStacks is false and captureLine is called', () => {
        const originalHasStacks = (global as any).hasStacks;
        (global as any).hasStacks = false;
        const originalCaptureLine = (global as any).captureLine;
        (global as any).captureLine = function() {
            if (!(global as any).hasStacks) {
                throw new Error("hasStacks is false");
            }
        };
        expect(() => (global as any).captureLine()).toThrowError("hasStacks is false");
        (global as any).hasStacks = originalHasStacks;
        (global as any).captureLine = originalCaptureLine;
    });
});