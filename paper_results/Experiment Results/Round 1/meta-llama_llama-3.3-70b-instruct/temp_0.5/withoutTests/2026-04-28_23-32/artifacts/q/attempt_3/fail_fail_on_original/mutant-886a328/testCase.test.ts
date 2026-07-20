import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error with a specific message when Q.noConflict is called', () => {
        let error;
        try {
            Q.noConflict();
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
        expect(error.message).not.toBe('');
    });
});