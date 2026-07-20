import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call process.nextTick when process.nextTick is defined', () => {
        // Mock the process object to simulate a Node environment
        const originalProcess = global.process;
        const nextTickSpy = jest.fn();
        global.process = {
            nextTick: nextTickSpy,
        };

        Q(1);

        expect(nextTickSpy).toHaveBeenCalledTimes(1);

        // Restore the original process object
        global.process = originalProcess;
    });
});