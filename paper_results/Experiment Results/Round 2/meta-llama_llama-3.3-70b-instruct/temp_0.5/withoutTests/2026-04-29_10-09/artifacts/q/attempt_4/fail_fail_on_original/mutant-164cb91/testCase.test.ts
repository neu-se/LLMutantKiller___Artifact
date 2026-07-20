import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const originalProcess = global.process;
        global.process = { emit: jest.fn() };
        const promise = Q.reject('Test rejection');
        Q.nextTick.runAfter(() => {
            expect(global.process.emit).toHaveBeenCalledTimes(1);
            expect(global.process.emit).toHaveBeenCalledWith('unhandledRejection', 'Test rejection', promise);
        });
        global.process = originalProcess;
    });
});