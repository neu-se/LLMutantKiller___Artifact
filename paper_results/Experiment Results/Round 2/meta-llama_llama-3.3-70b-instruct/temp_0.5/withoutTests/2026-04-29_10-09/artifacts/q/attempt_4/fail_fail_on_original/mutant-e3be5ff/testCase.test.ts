import * as q from "../../../../../../../../../../../subject_repositories/q/q.js"

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        q.Q.stopUnhandledRejectionTracking();
        q.Q.resetUnhandledRejections();
        expect(q.Q.getUnhandledReasons()).toEqual([]);
    });
});