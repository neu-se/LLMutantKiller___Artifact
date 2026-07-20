import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should track unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const unhandledRejections = Q.getUnhandledReasons();
        expect(unhandledRejections.length).toBe(1);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});