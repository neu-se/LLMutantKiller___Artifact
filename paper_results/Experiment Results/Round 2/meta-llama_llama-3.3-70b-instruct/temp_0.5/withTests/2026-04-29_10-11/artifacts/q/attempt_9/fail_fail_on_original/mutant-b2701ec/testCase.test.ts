describe('Promise', () => {
    it('should have inspect method that returns an object with state property', () => {
        const promise = Promise.resolve();
        const inspected = promise.inspect;
        expect(typeof inspected).toBe('function');
        const result = inspected();
        expect(typeof result).toBe('object');
        expect(result).toHaveProperty('state');
    });
});