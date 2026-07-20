import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('unhandled rejection tracking', () => {
    it('should report unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var promise = Q.reject('test');
        Q.nextTick.runAfter(function () {
            if (process.emit) {
                process.emit('unhandledRejection', 'test', promise);
            }
        });
        Q.nextTick(function() {
            expect(Q.getUnhandledReasons()).toEqual(['(no stack) test']);
        });
    });
});