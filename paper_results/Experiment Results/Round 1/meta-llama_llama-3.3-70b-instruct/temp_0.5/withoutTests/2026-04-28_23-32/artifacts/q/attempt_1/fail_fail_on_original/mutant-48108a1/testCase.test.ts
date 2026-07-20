import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return a pending state when inspect is called on a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});