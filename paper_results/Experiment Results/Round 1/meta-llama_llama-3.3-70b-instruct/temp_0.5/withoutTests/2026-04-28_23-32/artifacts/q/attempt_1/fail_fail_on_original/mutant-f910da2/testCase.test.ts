import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when using async with a generator that throws a StopIteration exception', () => {
        const makeGenerator = function* () {
            throw new Error();
        };

        const asyncFunction = Q.async(makeGenerator);
        expect(() => asyncFunction()).toThrowError();
    });
});