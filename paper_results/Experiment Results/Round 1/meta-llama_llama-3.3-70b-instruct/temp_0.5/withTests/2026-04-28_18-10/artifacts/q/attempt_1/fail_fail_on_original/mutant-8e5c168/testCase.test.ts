import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('promise function', () => {
    it('should throw an error when resolver is not a function', () => {
        expect(() => Q.promise('not a function')).toThrowError('resolver must be a function.');
    });
});