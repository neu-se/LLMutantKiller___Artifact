import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should not resolve a promise when messages are present and the promise is already resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const value = "test value";
        deferred.resolve(value);
        deferred.promiseDispatch(function(resolve, op, args) {
            resolve("new value");
        }, "when", ["fulfilled"]);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(value);
    });
});