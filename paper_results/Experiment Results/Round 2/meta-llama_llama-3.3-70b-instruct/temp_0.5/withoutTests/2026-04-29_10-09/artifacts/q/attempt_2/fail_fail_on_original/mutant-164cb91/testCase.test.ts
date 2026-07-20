import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections with process.emit as a function', () => {
        const originalProcessEmit = global.process.emit;
        global.process.emit = jest.fn();
        const promise = Q.reject('Test rejection');
        Q.nextTick.runAfter(() => {
            expect(global.process.emit).toHaveBeenCalledTimes(1);
            expect(global.process.emit).toHaveBeenCalledWith('unhandledRejection', 'Test rejection', promise);
        });
        global.process.emit = originalProcessEmit;
    });
});