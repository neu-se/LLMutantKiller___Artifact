import { Q } from './q.js';

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const unhandledRejectionsBefore = Q.getUnhandledReasons();
        expect(unhandledRejectionsBefore.length).toBe(0);
        Q.nextTick(() => {
            const unhandledRejectionsAfter = Q.getUnhandledReasons();
            expect(unhandledRejectionsAfter.length).toBe(1);
            promise.catch(() => {
                Q.nextTick(() => {
                    const unhandledRejectionsAfterCatch = Q.getUnhandledReasons();
                    expect(unhandledRejectionsAfterCatch.length).toBe(0);
                });
            });
        });
    });
});