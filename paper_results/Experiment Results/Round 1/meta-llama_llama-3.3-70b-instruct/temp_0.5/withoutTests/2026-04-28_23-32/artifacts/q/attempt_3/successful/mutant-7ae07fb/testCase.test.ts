import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should throw an error with a specific message when resolver is not a function', () => {
        let errorMessage;
        try {
            Q.promise('not a function');
        } catch (e) {
            errorMessage = e.message;
        }
        expect(errorMessage).toBe('resolver must be a function.');
    });
});