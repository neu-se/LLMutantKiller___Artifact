import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle then method with progress notification correctly', () => {
        let progressCalled = false;
        const promise = Q((resolve: (value: any) => void, reject: (reason: any) => void, notify: (progress: any) => void) => {
            notify(42);
            resolve(42);
        });
        promise.then((value: any) => {
            expect(value).toBe(42);
        }, () => {
            throw new Error('Promise should not be rejected');
        }, (progress: any) => {
            progressCalled = true;
            expect(progress).toBe(42);
            throw new Error('Progress notification should not be called');
        });
        expect(progressCalled).toBe(false);
    });
});