describe('Promise', () => {
    it('should correctly handle Promise.prototype.valueOf for a fulfilled promise', () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(promise);
    });
});