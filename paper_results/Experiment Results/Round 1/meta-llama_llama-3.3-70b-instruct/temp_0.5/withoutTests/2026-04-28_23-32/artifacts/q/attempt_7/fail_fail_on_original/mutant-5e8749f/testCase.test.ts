import { Q } from './q';

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        Q.nextTick(() => {
            const unhandledRejections = Q.getUnhandledReasons();
            expect(unhandledRejections.length).toBe(1);
            promise.catch(() => {
                Q.nextTick(() => {
                    const unhandledRejectionsAfterCatch = Q.getUnhandledReasons();
                    expect(unhandledRejectionsAfterCatch.length).toBe(0);
                });
            });
        });
    });
});