import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.noConflict', () => {
    it('should throw an error with a non-empty message when Q is not used as a global', () => {
        global.Q = Q;
        const error = new Error();
        expect(() => Q.noConflict()).toThrowError(expect.anything());
        const thrownError = expect(() => Q.noConflict()).toThrowError();
        expect(thrownError.message).not.toBe('');
        delete global.Q;
    });
});