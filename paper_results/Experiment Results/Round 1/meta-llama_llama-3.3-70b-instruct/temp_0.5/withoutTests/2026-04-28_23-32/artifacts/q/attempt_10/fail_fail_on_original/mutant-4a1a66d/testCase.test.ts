import Q from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle async function generator correctly', async () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            throw new QReturnValue(2);
        });

        const result = await asyncFunction();
        expect(result).toBe(2);
    });
});