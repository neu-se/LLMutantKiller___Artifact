import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should untrack rejection when promise is resolved after rejection", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        q.trackRejection(promise, "reason");
        deferred.resolve();
        expect(q.getUnhandledReasons().length).toBe(0);
    });
});