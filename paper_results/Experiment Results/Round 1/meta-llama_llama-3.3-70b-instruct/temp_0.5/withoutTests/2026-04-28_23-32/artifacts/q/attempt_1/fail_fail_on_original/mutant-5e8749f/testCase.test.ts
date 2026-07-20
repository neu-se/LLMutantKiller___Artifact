import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle unhandled rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const unhandledRejections = Q.getUnhandledReasons();
        expect(unhandledRejections).toEqual([]);
        promise.catch(() => {});
        Q.nextTick(() => {
            const newUnhandledRejections = Q.getUnhandledReasons();
            expect(newUnhandledRejections).toEqual([]);
        });
    });
});