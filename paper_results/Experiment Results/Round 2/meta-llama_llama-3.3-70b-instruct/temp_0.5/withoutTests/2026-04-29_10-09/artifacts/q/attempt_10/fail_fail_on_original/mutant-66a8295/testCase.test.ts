import { Q } from "../../../q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.defer().promise;
        const error = new Error('Test error');
        Q.trackRejection(promise, error);
        expect(Q.getUnhandledReasons().length).toBe(1);
        if (Q.trackUnhandledRejections) {
            Q.trackRejection(promise, error);
            expect(Q.getUnhandledReasons().length).toBe(2);
        } else {
            Q.trackRejection(promise, error);
            expect(Q.getUnhandledReasons().length).toBe(1);
        }
    });
});