describe('Promise', () => {
    it('should call the set method on an object', () => {
        const obj = {};
        const promise = Q(obj).set('a', 1);
        return promise.then(() => {
            expect(obj.a).toBe(1);
        });
    });
});