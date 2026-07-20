import { Q } from "../../../q";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        try {
            Q(function () {
                throw new Error("Test error");
            })();
        } catch (error) {
            expect(error.stack).toContain("q.js");
        }
    });
});