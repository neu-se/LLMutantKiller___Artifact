import { Q } from "../../../../../../q.js";

describe('Q', () => {
    it('should filter out internal frames from stack traces', () => {
        const promise = Q.reject(new Error('Test error'));

        promise.catch((error: any) => {
            const stackTrace = error.stack;

            expect(stackTrace).not.toContain('filterStackString');
        });
    });
});