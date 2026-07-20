import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
    it("should reject with error when error is provided and arguments length is less than or equal to 2 in the mutated code but fail in the original code", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        const arg1 = "arg1";

        deferred.makeNodeResolver()(error, arg1);

        return deferred.promise.catch((err) => {
            expect(err).toBe(error);
        });
    });
});