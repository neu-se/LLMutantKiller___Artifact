import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        // Create a promise that will be rejected
        const rejectedPromise = Q.reject(new Error('Test error'));

        // Track the rejection
        Q.nextTick.runAfter(() => {
            // Check if the rejection is tracked
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons.length).toBe(1);
            expect(unhandledReasons[0]).toContain('Test error');
        });

        // Untrack the rejection
        rejectedPromise.catch(() => {});

        // Check if the rejection is untracked
        Q.nextTick.runAfter(() => {
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons.length).toBe(0);
        });
    });
});