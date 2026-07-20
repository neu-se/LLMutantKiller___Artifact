import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle progress notifications correctly', () => {
        let progressCalled = false;
        let value = 42;

        Q((resolve, reject, notify) => {
            notify(value);
            resolve(value);
        }).then((val) => {
            expect(val).toBe(value);
        }, () => {
            throw new Error('Promise should not be rejected');
        }, (progress) => {
            progressCalled = true;
            expect(progress).toBe(value);
        });

        expect(progressCalled).toBe(true);
    });
});