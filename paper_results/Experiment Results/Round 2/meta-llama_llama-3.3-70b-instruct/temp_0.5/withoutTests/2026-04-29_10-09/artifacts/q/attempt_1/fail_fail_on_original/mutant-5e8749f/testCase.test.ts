import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const unhandledRejections = Q.getUnhandledReasons();
        expect(unhandledRejections.length).toBe(0);
        
        // Use Q.done to trigger the rejection handling
        Q.done(promise, null, null, null);
        
        // Wait for the next tick to ensure the rejection is handled
        setTimeout(() => {
            const newUnhandledRejections = Q.getUnhandledReasons();
            expect(newUnhandledRejections.length).toBe(1);
        }, 0);
    });
});