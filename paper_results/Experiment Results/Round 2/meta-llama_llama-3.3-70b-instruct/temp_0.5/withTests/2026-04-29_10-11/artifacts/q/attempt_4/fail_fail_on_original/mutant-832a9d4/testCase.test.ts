import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should handle nextTick correctly", () => {
        const deferred = q.defer();
        return q.nextTick(() => {
            deferred.resolve();
        }).then(() => {
            return deferred.promise;
        });
    });
});