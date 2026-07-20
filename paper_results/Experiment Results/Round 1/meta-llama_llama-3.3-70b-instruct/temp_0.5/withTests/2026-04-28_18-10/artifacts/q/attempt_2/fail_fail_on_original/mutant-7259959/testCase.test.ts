import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of the mutated file', async () => {
        const asyncFunction = Q.async(function* () {
            try {
                yield Q.resolve();
            } catch (e) {
                throw e;
            }
        });
        const result = asyncFunction();
        await expect(result).resolves.not.toThrow();
    });
});