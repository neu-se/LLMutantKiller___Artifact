describe('Q Promise', () => {
    it('should return a promise that is fulfilled when the value is an object', (done) => {
        const promise = Promise.resolve({ a: 5 });
        promise.then((value: any) => {
            expect(value).toEqual({ a: 5 });
            done();
        });
    });
});