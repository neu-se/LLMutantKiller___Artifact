import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle StopIteration exception correctly', async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            throw new StopIteration();
        });

        try {
            await asyncFunction();
            expect(true).toBe(false); // If this line is reached, the test fails
        } catch (error) {
            expect(error instanceof StopIteration).toBe(true);
        }
    });
});