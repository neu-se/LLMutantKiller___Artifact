import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle stack traces correctly', () => {
        const q = Q(function (resolve, reject) {
            try {
                throw new Error();
            } catch (e) {
                resolve(e);
            }
        });

        q.then((error) => {
            const stack = error.stack;
            expect(stack).not.toContain('at isInternalFrame');
        });
    });
});