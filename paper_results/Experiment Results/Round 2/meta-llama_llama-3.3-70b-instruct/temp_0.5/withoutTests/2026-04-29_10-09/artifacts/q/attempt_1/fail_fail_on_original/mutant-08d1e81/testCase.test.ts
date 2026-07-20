import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections only when process.emit is a function', () => {
        // Create a promise that rejects
        const promise = Q.reject(new Error('Test error'));

        // Mock process.emit to test the behavior
        const originalEmit = process.emit;
        process.emit = function() {};
        Q.resetUnhandledRejections();

        // Track the rejection
        Q.nextTick.runAfter(function () {
            Q.trackRejection(promise, new Error('Test error'));
        });

        // Check if the rejection is tracked
        expect(Q.getUnhandledReasons()).toHaveLength(1);

        // Restore process.emit
        process.emit = originalEmit;

        // Reset unhandled rejections
        Q.resetUnhandledRejections();
    });
});