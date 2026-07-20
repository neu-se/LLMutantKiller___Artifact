import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with Q and have a working Q.return with QReturnValue', () => {
        const Q = q.default || q;
        try {
            Q.return(10);
        } catch (e) {
            expect(e.constructor.name).toBe('QReturnValue');
        }
    });
});