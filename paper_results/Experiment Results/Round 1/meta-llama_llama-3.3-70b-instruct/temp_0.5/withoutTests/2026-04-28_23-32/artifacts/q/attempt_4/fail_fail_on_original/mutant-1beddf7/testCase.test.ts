import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should reject with the reason when the resolver throws an error', async () => {
        const resolver = () => { throw new Error('Test error'); };
        const promise = Q.promise(resolver);
        try {
            await promise;
            fail('Expected promise to reject');
        } catch (error: unknown) {
            if (error instanceof Error) {
                expect(error.message).toBe('Test error');
            } else {
                fail('Expected error to be an instance of Error');
            }
        }
    });
});