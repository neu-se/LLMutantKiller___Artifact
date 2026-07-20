import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspection mutation test", () => {
    it("should return pending state for unresolved deferred promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        // The promise should be in pending state initially
        const inspection = promise.inspect();
        expect(inspection).toEqual({ state: "pending" });
    });
});