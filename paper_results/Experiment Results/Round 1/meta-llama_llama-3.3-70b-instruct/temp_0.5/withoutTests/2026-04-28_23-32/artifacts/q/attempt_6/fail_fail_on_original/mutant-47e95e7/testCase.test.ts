describe('Q Promise', () => {
    it('should return a promise that is fulfilled when the value is an object', () => {
        const promise = Q({ a: 5 });
        let fulfilled = false;
        promise.then((value) => {
            expect(value).toEqual({ a: 5 });
            fulfilled = true;
        });
        expect(fulfilled).toBe(true);
    });
});