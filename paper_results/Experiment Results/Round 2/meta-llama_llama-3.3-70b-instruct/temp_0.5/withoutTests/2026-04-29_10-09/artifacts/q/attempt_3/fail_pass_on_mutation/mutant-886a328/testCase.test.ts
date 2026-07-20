import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.noConflict', () => {
    it('should throw an error with a specific message when Q is not used as a global', () => {
        global.Q = Q;
        expect(() => Q.noConflict()).toThrowError("Q.noConflict only works when Q is used as a global");
        delete global.Q;
    });
});