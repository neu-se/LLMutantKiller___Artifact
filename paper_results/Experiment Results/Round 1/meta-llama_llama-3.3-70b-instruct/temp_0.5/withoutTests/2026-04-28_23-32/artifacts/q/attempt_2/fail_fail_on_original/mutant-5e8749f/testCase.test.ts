import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const unhandledRejectionsBefore = Q.getUnhandledReasons();
        expect(unhandledRejectionsBefore).toEqual([]);
        Q.nextTick(() => {
            const unhandledRejectionsAfter = Q.getUnhandledReasons();
            expect(unhandledRejectionsAfter.length).toBeGreaterThan(0);
            promise.catch(() => {});
            Q.nextTick(() => {
                const unhandledRejectionsAfterCatch = Q.getUnhandledReasons();
                expect(unhandledRejectionsAfterCatch.length).toBeLessThan(unhandledRejectionsAfter.length);
            });
        });
    });
});