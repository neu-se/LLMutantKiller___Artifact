import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate when available', () => {
        const originalSetTimeout = global.setTimeout;
        const originalSetImmediate = global.setImmediate;
        let setTimeoutCalled = false;
        let setImmediateCalled = false;

        // @ts-ignore
        global.setImmediate = (fn: () => void) => {
            setImmediateCalled = true;
            fn();
        };

        // @ts-ignore
        global.setTimeout = () => {
            setTimeoutCalled = true;
        };

        const originalQNextTick = Q.nextTick;

        Q.nextTick = (fn: () => void) => {
            originalQNextTick(fn);
            expect(setTimeoutCalled).toBe(false);
            expect(setImmediateCalled).toBe(true);
        };

        Q.nextTick(() => {});

        global.setTimeout = originalSetTimeout;
        global.setImmediate = originalSetImmediate;
        Q.nextTick = originalQNextTick;
    });
});