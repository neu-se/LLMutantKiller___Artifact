import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        var error = new Error();
        try {
            Q.resolve().then(() => {
                throw error;
            });
        } catch (e) {
            expect(e.stack).not.toBeNull();
        }
        expect(Q.longStackSupport).toBe(false);
    });
});