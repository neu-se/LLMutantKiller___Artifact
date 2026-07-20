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
            if (typeof globalThis.MessageChannel !== "undefined") {
                expect(resolved).toBe(true);
            } else {
                expect(resolved).toBe(false);
            }
            done();
        }, 0);
    });
});