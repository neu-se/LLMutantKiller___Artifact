import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        const reason = new Error('Test reason');
        Q.reject(reason);
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});