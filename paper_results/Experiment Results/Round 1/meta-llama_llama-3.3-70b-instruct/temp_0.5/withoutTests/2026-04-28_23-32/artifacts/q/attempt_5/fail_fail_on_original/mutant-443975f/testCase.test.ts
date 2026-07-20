import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the function passed to nextTick in the next tick', (done) => {
        let called = false;
        const originalSetTimeout = global.setTimeout;
        const setTimeoutSpy = jest.fn();
        global.setTimeout = setTimeoutSpy;
        Q.nextTick(() => {
            called = true;
            expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
            global.setTimeout = originalSetTimeout;
            done();
        });
    });
});