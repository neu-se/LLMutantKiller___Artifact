import { Q } from '../../q';

describe('q', () => {
    it('should handle unhandled rejections correctly', () => {
        Q.trackUnhandledRejections = true;
        const promise = Q.reject(new Error('Test error'));
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(0);
        Q.trackRejection(promise, new Error('Test error'));
        expect(Q.unhandledRejections.length).toBe(1);
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(0);
        if (Q.trackUnhandledRejections) {
            expect(Q.unhandledRejections.length).toBe(0);
        } else {
            expect(Q.unhandledRejections.length).toBe(1);
        }
    });
});