import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const error = new Error();
        error.stack = "at functionName (filename:lineNumber:columnNumber)";
        const promise = Q.reject(error);
        const result = promise.catch((err) => {
            if (err.stack && err.stack.includes("lineNumber")) {
                throw new Error("Stack line found");
            }
            return err;
        });
        expect(result).rejects.toThrowError("Stack line found");
    });
});