import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate when available', (done) => {
        const originalSetImmediate = global.setImmediate;
        let setImmediateCalled = false;
        global.setImmediate = () => {
            setImmediateCalled = true;
        };

        const promise = Q(1);
        promise.then(() => {
            expect(setImmediateCalled).toBe(true);
            global.setImmediate = originalSetImmediate;
            done();
        });
    });
});