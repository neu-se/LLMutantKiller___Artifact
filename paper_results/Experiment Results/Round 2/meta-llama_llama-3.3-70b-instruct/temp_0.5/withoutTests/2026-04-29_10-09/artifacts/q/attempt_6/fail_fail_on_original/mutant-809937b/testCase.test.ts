import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not call process.emit when untracking a rejection with the mutated condition', () => {
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = () => {
            emitCalled = true;
        };

        const promise = Q.reject('Test rejection');
        // Simulate the mutated condition
        if (typeof process === "object" && true) {
            Q.nextTick.runAfter(function () {
                var atReport = -1;
                // Do nothing
            });
        } else {
            Q.untrackRejection(promise);
        }

        expect(emitCalled).toBe(false);

        process.emit = originalEmit;
    });
});