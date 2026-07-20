import { Q } from "./q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const reason = new Error('Test error');
        const promise = Q.reject(reason);
        const unhandledReasonsBefore = Q.getUnhandledReasons();
        Q.nextTick(() => {
            const unhandledReasonsAfter = Q.getUnhandledReasons();
            expect(unhandledReasonsAfter.length).toBe(unhandledReasonsBefore.length + 1);
            if (reason.stack) {
                expect(unhandledReasonsAfter[0]).toContain(reason.stack);
            } else {
                expect(unhandledReasonsAfter[0]).toBe("(no stack) " + reason);
            }
        });
    });
});