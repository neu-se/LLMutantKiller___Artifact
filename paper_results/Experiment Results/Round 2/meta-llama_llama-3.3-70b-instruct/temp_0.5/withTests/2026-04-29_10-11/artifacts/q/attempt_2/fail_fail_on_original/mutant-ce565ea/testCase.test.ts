import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe("pending");
        deferred.resolve();
        const promise2 = Q(promise);
        expect(promise2.valueOf()).toBe(promise);
    });
});