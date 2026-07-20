import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error with a specific message when trying to denodeify an undefined function', () => {
        const error = new Error();
        try {
            Q.denodeify(undefined);
        } catch (e) {
            error = e;
        }
        expect(error.message).not.toBe('');
    });
});