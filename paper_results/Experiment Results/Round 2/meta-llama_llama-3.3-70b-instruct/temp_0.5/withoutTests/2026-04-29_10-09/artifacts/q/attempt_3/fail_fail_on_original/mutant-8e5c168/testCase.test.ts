import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a resolver function', () => {
        expect(() => Q.promise(function(resolve, reject, notify) {})).not.toThrow();
    });

    it('should throw an error when resolver is not a function', () => {
        expect(() => Q.promise('not a function')).toThrowError('resolver must be a function.');
    });
});