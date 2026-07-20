describe('Q', () => {
    it('should throw an error with a correct message when a promise times out', async () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.timeout(Q.resolve(), 10);
        try {
            await promise;
            throw new Error('Expected promise to reject');
        } catch (error: any) {
            expect(error.message).toContain('ms');
        }
    });
});