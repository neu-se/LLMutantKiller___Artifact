import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
    it("should resolve with an array of arguments when error is provided and arguments length is greater than 2", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        const arg1 = "arg1";
        const arg2 = "arg2";
        const arg3 = "arg3";

        deferred.makeNodeResolver()(error, arg1, arg2, arg3);

        return deferred.promise.then((value) => {
            expect(value).toEqual([arg1, arg2, arg3]);
        });
    });
});