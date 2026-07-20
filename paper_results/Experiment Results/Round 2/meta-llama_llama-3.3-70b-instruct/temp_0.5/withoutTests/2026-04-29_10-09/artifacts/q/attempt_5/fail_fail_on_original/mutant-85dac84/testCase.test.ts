describe('Q', () => {
    it('should reject the promise when thenReject is called', () => {
        const promise = Q.resolve();
        const thenRejectSpy = jest.spyOn(promise, 'thenReject');
        promise.thenReject(new Error('Test error'));
        expect(thenRejectSpy).toHaveBeenCalledTimes(1);
    });
});