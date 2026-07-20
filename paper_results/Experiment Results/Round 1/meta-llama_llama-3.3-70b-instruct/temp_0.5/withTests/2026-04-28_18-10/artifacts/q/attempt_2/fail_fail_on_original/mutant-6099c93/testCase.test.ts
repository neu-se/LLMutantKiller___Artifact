import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('unhandled rejection tracking', () => {
    it('should report unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var promise = Q.reject('test');
        var reported = false;
        process.on('unhandledRejection', function(reason, p) {
            reported = true;
            expect(reason).toBe('test');
            expect(p).toBe(promise);
        });
        Q.nextTick(function() {
            expect(reported).toBe(true);
        });
    });
});