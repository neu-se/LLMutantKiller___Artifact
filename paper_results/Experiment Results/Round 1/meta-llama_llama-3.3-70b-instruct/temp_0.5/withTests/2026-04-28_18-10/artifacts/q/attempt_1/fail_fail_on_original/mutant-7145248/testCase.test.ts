import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
    it("should resolve with all arguments when error is provided", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        const arg1 = "arg1";
        const arg2 = "arg2";

        deferred.makeNodeResolver()(error, arg1, arg2);

        return deferred.promise.then((value) => {
            expect(value).toEqual([arg1, arg2]);
        });
    });
});