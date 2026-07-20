import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle stack traces', () => {
        try {
            Q.resolve().then(() => {
                throw new Error('Test error');
            });
        } catch (e) {
            expect(e.stack).not.toBeNull();
        }
    });
});