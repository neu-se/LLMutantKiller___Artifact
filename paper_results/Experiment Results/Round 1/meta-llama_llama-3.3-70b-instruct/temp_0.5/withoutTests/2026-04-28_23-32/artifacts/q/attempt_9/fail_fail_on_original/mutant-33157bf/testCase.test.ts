describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const Q = require('./q');
        const originalProcess = global.process;
        const emitSpy = jest.spyOn(originalProcess, 'emit');
        const promise = Q.reject(new Error('Test error'));
        Q.nextTick.runAfter(() => {
            expect(emitSpy).toHaveBeenCalledTimes(1);
            expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', new Error('Test error'), promise);
        });
        emitSpy.mockRestore();
        expect(Q.nextTick.runAfter).toHaveBeenCalledTimes(1);
    });
});