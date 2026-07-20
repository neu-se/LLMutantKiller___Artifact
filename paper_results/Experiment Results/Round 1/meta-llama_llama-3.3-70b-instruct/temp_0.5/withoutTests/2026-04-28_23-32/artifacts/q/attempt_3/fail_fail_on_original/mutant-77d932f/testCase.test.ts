import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        const promise = Q(function () {
            throw new Error("Test error");
        })();
        promise.catch((error: any) => {
            expect(typeof error.stack).toBe('string');
        });
    });
});