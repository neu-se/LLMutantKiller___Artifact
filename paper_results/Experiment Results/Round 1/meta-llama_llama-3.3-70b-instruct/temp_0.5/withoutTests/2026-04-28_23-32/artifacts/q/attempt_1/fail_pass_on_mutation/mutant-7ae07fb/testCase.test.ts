import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should throw an error with a meaningful message when resolver is not a function', () => {
        expect(() => Q.promise('not a function')).toThrowError(TypeError, 'resolver must be a function.');
    });
});