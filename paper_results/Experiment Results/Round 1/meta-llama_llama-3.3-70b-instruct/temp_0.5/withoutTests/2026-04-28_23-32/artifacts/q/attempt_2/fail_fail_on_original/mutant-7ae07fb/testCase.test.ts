import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should throw an error with a specific message when resolver is not a function', () => {
        const error = new Error();
        try {
            Q.promise('not a function');
        } catch (e) {
            error = e;
        }
        expect(error.message).toBe('resolver must be a function.');
    });
});