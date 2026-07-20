import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reset unhandled rejections tracking correctly', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});