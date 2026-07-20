import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should inspect a pending promise correctly", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect().state).toBe("pending");
        deferred.resolve();
        expect(promise.inspect().state).toBe("fulfilled");
    });
});