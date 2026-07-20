import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle StopIteration correctly', () => {
        const makeGenerator = function* () {
            yield 1;
            throw { name: 'StopIteration' };
            yield 2;
        };

        const asyncFunction = Q.async(makeGenerator);
        expect(asyncFunction()).resolves.toEqual(1);
    });
});