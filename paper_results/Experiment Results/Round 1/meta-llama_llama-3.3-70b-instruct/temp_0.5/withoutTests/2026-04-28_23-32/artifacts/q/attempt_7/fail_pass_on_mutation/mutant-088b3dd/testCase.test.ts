import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle a promise', () => {
        const error = new Error("Test error");
        const stackLine = "at functionName (filename:lineNumber:columnNumber)";
        error.stack = stackLine;
        const promise = Q.reject(error);
        const result = promise.catch((err) => {
            if (err.stack && err.stack.includes("filename")) {
                return true;
            }
            return false;
        });
        expect(result).resolves.toBe(true);
    });
});