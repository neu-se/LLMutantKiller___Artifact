import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not call process.nextTick when process.toString returns "[object process]" and process.nextTick is undefined in the mutated code', () => {
        // Mock the process object to simulate a Node environment
        const originalProcess = global.process;
        const nextTickSpy = jest.fn();
        global.process = {
            nextTick: nextTickSpy,
            toString: () => "[object process]",
        };

        // Simulate the mutation by setting the condition to always true
        const originalCondition = global.process.toString === "[object process]" && global.process.nextTick;
        global.process.toString = () => {
            return true;
        };

        Q(1);

        expect(nextTickSpy).toHaveBeenCalledTimes(1);

        // Restore the original process object
        global.process = originalProcess;
    });
});