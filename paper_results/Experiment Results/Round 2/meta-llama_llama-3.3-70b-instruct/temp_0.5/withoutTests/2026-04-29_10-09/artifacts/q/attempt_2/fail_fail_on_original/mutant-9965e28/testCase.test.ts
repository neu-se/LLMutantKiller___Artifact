import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const reason = new Error('Test error');
        const promise = Q.reject(reason);
        Q.nextTick.runAfter(() => {
            expect(Q.getUnhandledReasons()[0]).toContain(reason.stack);
        });
    });
});