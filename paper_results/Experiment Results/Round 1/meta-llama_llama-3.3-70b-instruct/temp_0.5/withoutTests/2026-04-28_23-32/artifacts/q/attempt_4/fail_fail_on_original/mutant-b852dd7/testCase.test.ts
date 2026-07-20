import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly when process.emit is a function', () => {
        const originalProcess = global.process;
        global.process = {
            emit: jest.fn(),
            nextTick: jest.fn((fn) => fn()),
            ...originalProcess,
        };

        const rejectedPromise = Q.reject(new Error('Test error'));

        Q.nextTick(() => {
            Q.nextTick(() => {
                expect(global.process.emit).toHaveBeenCalledTimes(1);
                expect(global.process.emit).toHaveBeenCalledWith('unhandledRejection', expect.any(Error), rejectedPromise);
            });
        });

        global.process = originalProcess;
    });
});