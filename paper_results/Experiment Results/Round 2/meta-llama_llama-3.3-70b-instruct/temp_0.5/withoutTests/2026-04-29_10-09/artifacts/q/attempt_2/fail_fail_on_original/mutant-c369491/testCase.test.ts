import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle progress notifications correctly', () => {
        let progressCalled = false;
        let value = 42;

        const promise = Q((resolve, reject, notify) => {
            notify(value);
            resolve(value);
        });

        promise.then((val: any) => {
            expect(val).toBe(value);
        }, () => {
            throw new Error('Promise should not be rejected');
        }, (progress: any) => {
            progressCalled = true;
            expect(progress).toBe(value);
        });

        expect(progressCalled).toBe(true);
    });
});