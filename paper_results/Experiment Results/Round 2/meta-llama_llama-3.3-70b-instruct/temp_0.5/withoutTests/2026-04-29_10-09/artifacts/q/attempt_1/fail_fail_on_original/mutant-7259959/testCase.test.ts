import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.async', () => {
    it('should work with a generator that yields a promise', async () => {
        const asyncFunction = Q.async(function* () {
            const result = yield Q.resolve(42);
            return result;
        });
        const result = await asyncFunction();
        expect(result).toBe(42);
    });
});