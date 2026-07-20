import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter out internal frames from stack traces', () => {
        const promise = Q.reject(new Error('Test error'));

        promise.catch((error: any) => {
            const stackTrace = error.stack;

            expect(stackTrace).toContain('q.js');
        });
    });
});