import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections when trackUnhandledRejections is initially false', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(trackUnhandledRejections).toBe(false);
        Q.getUnhandledReasons();
        expect(trackUnhandledRejections).toBe(true);
    });
});