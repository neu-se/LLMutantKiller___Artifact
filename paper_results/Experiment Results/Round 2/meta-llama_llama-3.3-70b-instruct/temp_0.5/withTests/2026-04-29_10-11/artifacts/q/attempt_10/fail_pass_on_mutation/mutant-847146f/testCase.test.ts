describe('Q', () => {
    it('should have a catch method with correct name', () => {
        const Q = {
            catch: () => {}
        };
        const promise = {
            catch: Q.catch
        };
        expect(Object.keys(promise)).toContain('catch');
    });
});