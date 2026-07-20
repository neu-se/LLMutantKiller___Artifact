import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call nextTick callback', (done) => {
        let called = false;
        Q.nextTick(() => {
            called = true;
            done();
        });
        // We can't directly check if nextTick was called with setImmediate or setTimeout
        // But we can check if the callback was called
        setTimeout(() => {
            expect(called).toBe(true);
        }, 10);
    });
});