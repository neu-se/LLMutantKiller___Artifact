import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('promise function', () => {
    it('should throw an error when resolver is not a function in promise', () => {
        var promise = Q.promise;
        expect(() => promise()).toThrowError('resolver must be a function.');
    });
});