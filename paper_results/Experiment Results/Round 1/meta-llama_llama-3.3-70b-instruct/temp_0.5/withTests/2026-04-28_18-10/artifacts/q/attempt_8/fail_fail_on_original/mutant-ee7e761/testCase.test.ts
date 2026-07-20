describe('Promise prototype', () => {
    it('should have a "delete" method that is a function', () => {
        const promise = Promise.resolve({});
        expect(typeof promise['delete']).toBe('function');
    });
});