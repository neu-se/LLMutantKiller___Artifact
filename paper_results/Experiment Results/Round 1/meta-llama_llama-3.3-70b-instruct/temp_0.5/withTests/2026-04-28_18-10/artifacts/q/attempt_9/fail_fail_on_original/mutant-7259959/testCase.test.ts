import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of the mutated file', async () => {
        const generator = function* () {
            try {
                yield Q.resolve();
            } catch (e) {
                throw e;
            }
        };
        const asyncFunction = Q.async(generator);
        const result = asyncFunction();
        await expect(result).resolves.not.toThrow();
    });
});