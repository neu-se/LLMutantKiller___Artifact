import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should use setImmediate if available in nextTick', () => {
        const setImmediateSpy = jest.spyOn(global, 'setImmediate');
        const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

        Q.nextTick(() => {});

        expect(setTimeoutSpy).not.toHaveBeenCalled();
        expect(setImmediateSpy).toHaveBeenCalledTimes(1);

        setImmediateSpy.mockRestore();
        setTimeoutSpy.mockRestore();
    });
});