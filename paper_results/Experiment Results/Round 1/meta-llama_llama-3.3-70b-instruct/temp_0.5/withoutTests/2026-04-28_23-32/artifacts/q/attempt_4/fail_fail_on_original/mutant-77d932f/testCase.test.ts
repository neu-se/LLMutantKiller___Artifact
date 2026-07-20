import { Q } from "../../../q";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        const promise = Q(function () {
            throw new Error("Test error");
        })();
        promise.catch((error: any) => {
            expect(error.stack).toContain("q.js");
        });
    });
});