import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", () => {
        const deferred = q.defer();
        q.nextTick(() => {
            deferred.resolve("nextTick was called");
        });
        return deferred.promise.then((value) => {
            expect(value).toBe("nextTick was called");
        });
    });
});