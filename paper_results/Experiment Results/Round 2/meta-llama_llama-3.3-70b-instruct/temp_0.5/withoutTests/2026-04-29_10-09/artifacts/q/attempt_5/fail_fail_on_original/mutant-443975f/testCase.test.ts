import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate if available', (done) => {
        const originalSetTimeout = global.setTimeout;
        const originalSetImmediate = global.setImmediate;
        let setTimeoutCalled = false;
        let setImmediateCalled = false;

        global.setImmediate = () => {
            setImmediateCalled = true;
        };

        global.setTimeout = () => {
            setTimeoutCalled = true;
        };

        const promise = Q(1);
        promise.then((value: any) => {
            expect(setTimeoutCalled).toBe(false);
            expect(setImmediateCalled).toBe(true);
            expect(value).toBe(1);
            global.setTimeout = originalSetTimeout;
            global.setImmediate = originalSetImmediate;
            done();
        });
    });
});