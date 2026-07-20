import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it.skip('should use process.nextTick when process.toString returns "[object process]" and process.nextTick is defined', () => {
        // Mock the process object to simulate a Node environment
        const originalProcess = global.process;
        global.process = {
            nextTick: jest.fn(),
            toString: () => "[object process]",
        };

        Q(1);

        expect(global.process.nextTick).toHaveBeenCalledTimes(1);

        // Restore the original process object
        global.process = originalProcess;
    });

    it('should not use process.nextTick when process.toString does not return "[object process]"', () => {
        // Mock the process object to simulate a non-Node environment
        const originalProcess = global.process;
        global.process = {
            nextTick: jest.fn(),
            toString: () => "[object Object]",
        };

        Q(1);

        expect(global.process.nextTick).not.toHaveBeenCalled();

        // Restore the original process object
        global.process = originalProcess;
    });
});