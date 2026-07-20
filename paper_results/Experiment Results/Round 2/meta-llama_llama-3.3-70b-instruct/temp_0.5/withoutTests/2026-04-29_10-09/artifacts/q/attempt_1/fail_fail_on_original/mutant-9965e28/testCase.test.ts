import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const reasons = Q.getUnhandledReasons();
        expect(reasons.length).toBe(1);
        expect(reasons[0]).toContain('Test error');
    });
});