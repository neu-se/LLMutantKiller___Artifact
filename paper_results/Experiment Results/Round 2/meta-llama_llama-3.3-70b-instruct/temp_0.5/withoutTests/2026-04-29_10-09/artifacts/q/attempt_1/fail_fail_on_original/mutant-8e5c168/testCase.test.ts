import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when resolver is not a function', () => {
        expect(() => Q.promise('not a function')).toThrowError('resolver must be a function.');
    });
});