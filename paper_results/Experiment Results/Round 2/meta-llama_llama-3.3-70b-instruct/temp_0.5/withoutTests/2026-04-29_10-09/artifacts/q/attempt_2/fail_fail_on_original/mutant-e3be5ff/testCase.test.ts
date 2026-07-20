import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should reset unhandled rejections when trackUnhandledRejections is false', () => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});