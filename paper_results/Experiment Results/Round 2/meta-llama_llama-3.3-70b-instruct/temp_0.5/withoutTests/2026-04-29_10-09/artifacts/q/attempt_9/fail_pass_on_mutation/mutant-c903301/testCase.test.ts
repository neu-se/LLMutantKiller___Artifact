describe('Q promise', () => {
    it.skip('should call Q.onerror when progress callback throws an error', () => {
        const Q = {
            resolve: () => ({ progress: () => {} }),
            onerror: jest.fn(),
        };
        const promise = Q.resolve();
        const error = new Error('Test error');
        const progressCallback = () => { throw error; };
        promise.progress(progressCallback);
        expect(Q.onerror).toHaveBeenCalledTimes(1);
    });

    it('should not call Q.onerror when progress callback does not throw an error', () => {
        const Q = {
            resolve: () => ({ progress: () => {} }),
            onerror: jest.fn(),
        };
        const promise = Q.resolve();
        const progressCallback = () => {};
        promise.progress(progressCallback);
        expect(Q.onerror).not.toHaveBeenCalled();
    });
});