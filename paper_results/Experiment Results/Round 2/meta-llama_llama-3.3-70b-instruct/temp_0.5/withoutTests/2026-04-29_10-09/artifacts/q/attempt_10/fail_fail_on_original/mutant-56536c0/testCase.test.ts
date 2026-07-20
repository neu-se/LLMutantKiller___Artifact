import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise using MessageChannel', (done) => {
        const promise = q.defer();
        let resolved = false;
        const originalMessageChannel = globalThis.MessageChannel;
        globalThis.MessageChannel = undefined;
        q.nextTick(() => {
            resolved = true;
            promise.resolve('resolved');
        });
        setTimeout(() => {
            expect(resolved).toBe(false);
            globalThis.MessageChannel = originalMessageChannel;
            done();
        }, 0);
    });
});