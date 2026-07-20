import { Q } from "../../../q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const reason = new Error('Test reason');
        Q.reject(reason);
        expect(Q.getUnhandledReasons()[0]).toContain(reason.message);
    });
});