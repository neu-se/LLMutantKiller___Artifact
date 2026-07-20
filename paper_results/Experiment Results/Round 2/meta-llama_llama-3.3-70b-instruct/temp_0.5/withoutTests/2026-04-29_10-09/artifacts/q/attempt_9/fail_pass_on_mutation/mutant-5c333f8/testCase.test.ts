import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should handle stack traces correctly', () => {
        const error = new Error();
        const promise = q.reject(error);
        promise.catch((reason) => {
            const stack = reason.stack;
            const lines = stack.split('\n');
            const filterStackStringFound = lines.some((line) => line.includes('filterStackString'));
            expect(filterStackStringFound).toBe(false);
        });
    });
});