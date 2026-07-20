import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js"

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});