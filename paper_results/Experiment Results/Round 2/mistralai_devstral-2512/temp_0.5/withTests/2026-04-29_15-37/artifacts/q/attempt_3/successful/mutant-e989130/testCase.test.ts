const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deferred promise inspection", () => {
    it("should return pending state for unresolved deferred promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspection = promise.inspect();
        expect(inspection.state).toBe("pending");
    });
});