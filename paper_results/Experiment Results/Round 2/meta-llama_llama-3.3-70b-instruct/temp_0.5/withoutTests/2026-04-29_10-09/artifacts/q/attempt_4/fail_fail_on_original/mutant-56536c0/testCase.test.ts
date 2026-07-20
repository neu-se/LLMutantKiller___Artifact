import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', (done) => {
        const promise = q.defer();
        let resolved = false;
        const originalNextTick = q.nextTick;
        q.nextTick = () => {
            throw new Error('nextTick was called');
        };
        q.nextTick(() => {
            resolved = true;
            promise.resolve('resolved');
        });
        setTimeout(() => {
            expect(resolved).toBe(false);
            q.nextTick = originalNextTick;
            done();
        }, 100);
    });
});