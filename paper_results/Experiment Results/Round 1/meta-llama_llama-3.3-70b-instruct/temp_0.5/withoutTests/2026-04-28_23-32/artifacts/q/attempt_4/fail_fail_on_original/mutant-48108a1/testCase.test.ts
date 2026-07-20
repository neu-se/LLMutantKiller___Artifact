import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return an object when inspect is called on a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(typeof inspected).toBe("object");
    });
});