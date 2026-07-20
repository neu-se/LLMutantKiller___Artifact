describe('Promise prototype', () => {
    it('should have a "delete" method', () => {
        const promise = Q({});
        expect(promise['delete']).toBeDefined();
        expect(typeof promise['delete']).toBe('function');
    });
});