import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call onerror when a promise is rejected and no error handler is provided', () => {
        let onErrorCalled = false;
        Q.onerror = function(error) {
            onErrorCalled = true;
        };
        const rejectPromise = Q.reject(new Error('Test error'));
        rejectPromise.done();
        expect(onErrorCalled).toBe(true);
    });
});