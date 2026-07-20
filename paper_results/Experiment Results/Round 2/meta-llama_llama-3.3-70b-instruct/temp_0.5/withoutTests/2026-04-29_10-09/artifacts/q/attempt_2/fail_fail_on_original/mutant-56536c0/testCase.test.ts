import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', (done) => {
        const promise = Q.defer();
        let resolved = false;
        Q.nextTick(() => {
            resolved = true;
            promise.resolve('resolved');
        });
        setTimeout(() => {
            if (!resolved) {
                throw new Error('nextTick did not schedule the task');
            }
            promise.promise.then((value) => {
                expect(value).toBe('resolved');
                done();
            });
        }, 100);
    });
});