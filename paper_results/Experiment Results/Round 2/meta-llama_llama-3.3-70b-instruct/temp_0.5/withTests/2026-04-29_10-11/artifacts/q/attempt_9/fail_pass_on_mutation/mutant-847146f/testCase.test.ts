describe('Q', () => {
    it('should have a catch method that is callable', () => {
        const Q = {
            catch: () => {}
        };
        const promise = {
            catch: Q.catch
        };
        expect(promise.catch).toBeDefined();
        expect(typeof promise.catch).toBe('function');
        expect(() => promise.catch()).not.toThrow();
    });
});