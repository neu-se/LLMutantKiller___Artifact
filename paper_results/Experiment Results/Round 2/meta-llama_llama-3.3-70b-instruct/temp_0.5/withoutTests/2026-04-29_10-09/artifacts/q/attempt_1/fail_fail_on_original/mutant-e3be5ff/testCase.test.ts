import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});