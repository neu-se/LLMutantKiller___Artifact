describe('Q.any', () => {
    it('should reject if all promises are rejected', () => {
        const promise1 = Promise.reject('error1');
        const promise2 = Promise.reject('error2');
        const promise3 = Promise.reject('error3');

        return Promise.any([promise1, promise2, promise3]).then(
            (value) => {
                throw new Error('Expected Promise.any to reject');
            },
            (error: any) => {
                expect(error).toBeInstanceOf(AggregateError);
                expect(error.errors).toHaveLength(3);
            }
        );
    });
});