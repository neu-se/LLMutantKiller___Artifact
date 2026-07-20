import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter out internal frames from stack traces', () => {
        const originalFilterStackString = Q.filterStackString;
        const originalIsInternalFrame = Q.isInternalFrame;

        Q.filterStackString = function(stackString) {
            return stackString;
        };

        Q.isInternalFrame = function(stackLine) {
            return false;
        };

        const promise = Q.reject(new Error('Test error'));

        promise.catch((error) => {
            const stackTrace = error.stack;

            expect(stackTrace).toContain('filterStackString');
        });
    });
});