describe("Q Promise", () => {
    it("should throw an error when inspect is called on a pending promise and the result does not have a state property", () => {
        const Q = require("../../../../../../../../subject_repositories/q/q.js");
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        if (!("state" in inspected)) {
            throw new Error("Inspect result does not have a state property");
        }
    });
});