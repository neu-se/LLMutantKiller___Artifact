describe('Q', () => {
    it('should throw an error with a correct message when a promise times out', async () => {
        // Create a promise that times out after 10ms
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Timed out after 10 ms'));
            }, 10);
        });

        try {
            await promise;
            throw new Error('Expected promise to reject');
        } catch (error: any) {
            expect(error.message).toMatch(/Timed out after \d+ ms/);
        }
    });
});