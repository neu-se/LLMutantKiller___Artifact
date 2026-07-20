import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.noConflict', () => {
    it('should throw an error when Q is not used as a global', () => {
        global.Q = Q;
        expect(() => Q.noConflict()).toThrowError();
        delete global.Q;
    });
});