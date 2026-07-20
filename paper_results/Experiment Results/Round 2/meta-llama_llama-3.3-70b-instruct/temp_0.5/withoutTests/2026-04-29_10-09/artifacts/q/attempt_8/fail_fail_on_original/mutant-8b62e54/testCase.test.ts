import Q from '../../../../../../../../../../../subject_repositories/q/q';

describe('Q.any', () => {
    it('should reject when all promises are rejected and no promises are resolved', async () => {
        const promise1 = Q.reject('error1');
        const promise2 = Q.reject('error2');

        try {
            await Q.any([promise1, promise2]);
        } catch (error) {
            expect(error).toBeDefined();
            return;
        }

        throw new Error('Q.any should reject when all promises are rejected');
    }, 10000);
});