import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return a pending promise when valueOf is called on a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const result = promise.valueOf();
        expect(result).toBe(promise);
    });
});