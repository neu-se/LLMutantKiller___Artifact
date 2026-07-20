import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of the mutated file', async () => {
        const generator = function* () {
            try {
                yield Q.resolve();
                throw new Error('Test error');
            } catch (e) {
                yield Q(e);
            }
        };
        const asyncFunction = Q.async(generator);
        const result = asyncFunction();
        await expect(result).rejects.toThrow('Test error');
    });
});