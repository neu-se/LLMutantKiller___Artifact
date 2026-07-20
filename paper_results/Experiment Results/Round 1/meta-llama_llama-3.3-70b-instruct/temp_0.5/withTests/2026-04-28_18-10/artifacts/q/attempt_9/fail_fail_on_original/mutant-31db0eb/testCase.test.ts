describe('Q', () => {
    it('should have a nextTick function', () => {
        expect(typeof Q.nextTick).toBe('function');
    });
});