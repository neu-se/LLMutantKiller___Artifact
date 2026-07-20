describe('Promise', () => {
    it('should create a promise', () => {
        const promise = new Promise((resolve, reject) => {
            resolve();
        });
        expect(promise).toBeDefined();
    });
});