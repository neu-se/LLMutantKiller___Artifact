import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle error', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test Error");
        error.stack = "    at functionName (filename:lineNumber:columnNumber)";
        deferred.reject(error);
        return promise.then(null, (err: any) => {
            expect(err.stack).toContain("functionName");
        });
    });
});