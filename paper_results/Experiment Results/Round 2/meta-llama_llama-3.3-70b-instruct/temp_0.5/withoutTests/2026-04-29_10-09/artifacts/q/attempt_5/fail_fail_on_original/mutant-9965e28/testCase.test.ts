import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const reason = new Error('Test error');
        reason.stack = undefined;
        const promise = Q.reject(reason);
        const unhandledReasonsBefore = Q.getUnhandledReasons();
        Q.nextTick(() => {
            const unhandledReasonsAfter = Q.getUnhandledReasons();
            expect(unhandledReasonsAfter.length).toBe(unhandledReasonsBefore.length + 1);
            expect(unhandledReasonsAfter[0]).toBe("(no stack) " + reason);
        });
    });
});