import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle StopIteration correctly', async () => {
        const makeGenerator = function* () {
            yield 1;
            throw new QReturnValue(2);
        };

        const asyncFunction = Q.async(makeGenerator);
        await expect(asyncFunction()).resolves.not.toThrowError();
    });
});