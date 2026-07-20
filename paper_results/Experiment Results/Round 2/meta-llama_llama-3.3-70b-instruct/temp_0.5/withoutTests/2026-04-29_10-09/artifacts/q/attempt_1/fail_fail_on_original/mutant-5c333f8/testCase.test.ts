import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack traces correctly', () => {
        try {
            throw new Error();
        } catch (e) {
            const error = e;
            const promise = Q.reject(error);
            promise.catch((reason) => {
                const stack = reason.stack;
                expect(stack).not.toContain('at isInternalFrame');
            });
        }
    });
});