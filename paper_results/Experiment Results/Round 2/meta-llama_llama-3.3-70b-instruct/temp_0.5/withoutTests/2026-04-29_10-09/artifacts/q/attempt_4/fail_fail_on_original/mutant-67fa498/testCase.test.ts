describe('Q', () => {
    it('should properly handle the laterQueue', () => {
        const nextTick = Q.nextTick;
        expect(nextTick.runAfter).toBeInstanceOf(Function);
        nextTick.runAfter(() => {
            // Do nothing
        });
    });
});