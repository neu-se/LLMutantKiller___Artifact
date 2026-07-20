describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const Q = require('../../../../../../subject_repositories/q/q.js');
        const process = { emit: jest.fn() };
        const originalProcess = global.process;
        global.process = process;

        const promise = Q.reject(new Error('Test error'));
        Q.nextTick.runAfter(() => {
            expect(process.emit).toHaveBeenCalledTimes(1);
            expect(process.emit).toHaveBeenCalledWith('unhandledRejection', new Error('Test error'), promise);
        });

        global.process = originalProcess;
    });
});