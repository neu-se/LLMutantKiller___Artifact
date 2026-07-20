import { Q } from "../../../q.js";

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        Q.stopUnhandledRejectionTracking();
        const promise = Q.reject(new Error('Test error'));
        Q.done(promise, null, null, null);
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});