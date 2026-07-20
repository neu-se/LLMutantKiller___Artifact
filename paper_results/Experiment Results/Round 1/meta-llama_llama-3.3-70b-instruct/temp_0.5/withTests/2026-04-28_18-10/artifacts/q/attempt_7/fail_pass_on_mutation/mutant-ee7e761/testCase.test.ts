describe('Promise prototype', () => {
    it('should have a "delete" method that deletes a property from an object', () => {
        const obj = { a: 1, b: 2 };
        const promise = Promise.resolve(obj);
        promise.then((o) => {
            delete o['a'];
            expect(o).toEqual({ b: 2 });
        });
    });
});