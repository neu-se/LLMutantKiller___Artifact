import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const error = new Error("Test error");
        const stackLine = `at functionName (filename:1:1)`;
        const promise = Q.reject(error);
        const result = promise.catch((err) => {
            const stack = err.stack;
            if (stack && stack.includes(stackLine)) {
                throw new Error("Stack line found");
            }
            return err;
        });
        expect(result).rejects.toThrowError("Stack line found");
    });
});