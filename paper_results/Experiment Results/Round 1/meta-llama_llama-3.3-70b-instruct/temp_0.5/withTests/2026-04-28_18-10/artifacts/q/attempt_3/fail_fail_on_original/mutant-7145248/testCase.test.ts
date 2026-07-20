import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
    it("should resolve with error when error is provided and arguments length is less than or equal to 2", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        const arg1 = "arg1";

        deferred.makeNodeResolver()(error, arg1);

        return deferred.promise.then((value) => {
            expect(value).toEqual([arg1]);
        });
    });
});