describe('Q.join', () => {
    it('should throw an error when called', () => {
        const promise1 = Promise.resolve(5);
        const promise2 = Promise.resolve(5);
        expect(() => Q.join(promise1, promise2)).toThrowError();
    });
});