import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', (done) => {
        const promise = q.defer();
        let resolved = false;
        q.nextTick(() => {
            resolved = true;
            promise.resolve('resolved');
        });
        setTimeout(() => {
            if (!resolved) {
                throw new Error('nextTick did not schedule the task');
            }
            promise.promise.then((value: any) => {
                expect(value).toBe('resolved');
                done();
            });
        }, 100);
    });
});