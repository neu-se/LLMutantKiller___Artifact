import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use nextTick to resolve promise', (done) => {
        const originalNextTick = Q.nextTick;
        let nextTickCalled = false;
        Q.nextTick = () => {
            nextTickCalled = true;
            originalNextTick.apply(Q, arguments);
        };

        const promise = Q(1);
        promise.then((value) => {
            expect(nextTickCalled).toBe(true);
            expect(value).toBe(1);
            done();
        });
    });
});