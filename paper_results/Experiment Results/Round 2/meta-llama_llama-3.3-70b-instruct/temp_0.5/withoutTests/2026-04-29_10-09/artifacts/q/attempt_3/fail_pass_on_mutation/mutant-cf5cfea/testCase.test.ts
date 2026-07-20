import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise when an exception is thrown in the thenable', async () => {
        const thenable = {
            then: (resolve: (value: any) => void, reject: (reason: any) => void) => {
                throw new Error('Test error');
            }
        };

        const promise = Q(thenable);
        try {
            await promise;
            throw new Error('Promise should have been rejected');
        } catch (error) {
            expect(error.message).toBe('Test error');
        }
    });
});