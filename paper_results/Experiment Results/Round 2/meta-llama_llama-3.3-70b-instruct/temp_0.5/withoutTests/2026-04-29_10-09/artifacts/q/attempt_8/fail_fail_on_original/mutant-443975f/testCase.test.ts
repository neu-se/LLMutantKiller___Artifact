import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate when available in Node.js environment', () => {
        const originalProcess = global.process;
        const originalSetImmediate = global.setImmediate;

        // @ts-ignore
        global.process = {
            nextTick: () => {}
        };

        // @ts-ignore
        global.setImmediate = (fn: () => void) => {
            fn();
        };

        let setImmediateCalled = false;
        let nextTickCalled = false;

        // @ts-ignore
        global.setImmediate = (fn: () => void) => {
            setImmediateCalled = true;
            fn();
        };

        Q.nextTick(() => {});

        expect(setImmediateCalled).toBe(true);
        expect(nextTickCalled).toBe(false);

        global.process = originalProcess;
        global.setImmediate = originalSetImmediate;
    });
});