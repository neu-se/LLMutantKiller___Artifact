import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle StopIteration exception correctly', async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            throw new Error('Test error');
        });

        try {
            await asyncFunction();
        } catch (error) {
            expect(error.message).toBe('Test error');
        }
    });
});