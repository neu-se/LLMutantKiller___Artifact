import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error with a specific message when Q.noConflict is called', () => {
        const error = new Error();
        try {
            Q.noConflict();
        } catch (e) {
            error = e;
        }
        expect(error.message).toBe("Q.noConflict only works when Q is used as a global");
    });
});