describe('Q', () => {
    it('nearer function should return the fulfillment value of a fulfilled promise', () => {
        // Since we can't import Q, we'll assume it's a global variable
        const promise = Q(42);
        expect(Q.nearer(promise)).toBe(42);
    });
});