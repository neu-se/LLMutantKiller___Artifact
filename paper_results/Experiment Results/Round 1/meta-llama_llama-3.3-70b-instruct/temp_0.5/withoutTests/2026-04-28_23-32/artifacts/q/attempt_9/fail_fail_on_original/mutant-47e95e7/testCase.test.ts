describe('Q Promise', () => {
    it('should return a promise that is fulfilled when the value is an object', () => {
        const promise = Promise.resolve({ a: 5 });
        let fulfilled = false;
        promise.then((value: any) => {
            expect(value).toEqual({ a: 5 });
            fulfilled = true;
        });
        expect(fulfilled).toBe(true);
    });
});