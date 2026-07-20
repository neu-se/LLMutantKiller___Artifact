describe('Q', () => {
    it('should call catch method without throwing an error', () => {
        const Q = {
            catch: () => {}
        };
        const promise = {
            catch: Q.catch
        };
        expect(() => promise.catch()).not.toThrow();
    });
});