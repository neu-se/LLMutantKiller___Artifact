import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const reason = new Error('Test error');
        const promise = Q.reject(reason);
        Q.nextTick.runAfter(() => {
            const unhandledReasons = Q.getUnhandledReasons();
            if (reason.stack) {
                expect(unhandledReasons[0]).toContain(reason.stack);
            } else {
                expect(unhandledReasons[0]).toBe("(no stack) " + reason);
            }
        });
    });
});