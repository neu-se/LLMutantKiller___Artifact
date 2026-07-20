describe('Q', () => {
    it('should track unhandled rejections correctly when process.emit is a function', () => {
        const Q = require('./q.js');

        const originalProcess = global.process;
        const mockEmit = jest.fn();
        const mockNextTick = jest.fn((fn) => fn());

        global.process = {
            ...originalProcess,
            emit: mockEmit,
            nextTick: mockNextTick,
        };

        const rejectedPromise = Q.reject(new Error('Test error'));

        Q.nextTick(() => {
            Q.nextTick(() => {
                expect(mockEmit).toHaveBeenCalledTimes(1);
                expect(mockEmit).toHaveBeenCalledWith('unhandledRejection', expect.any(Error), rejectedPromise);
            });
        });

        global.process = originalProcess;
    });
});