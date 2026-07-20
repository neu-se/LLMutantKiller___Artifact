import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection reporting", () => {
    it("should untrack rejection when promise is resolved and then rejected", () => {
        var deferred = q.defer();
        var promise = deferred.promise;
        deferred.resolve();
        q.reject("reason");
        expect(q.getUnhandledReasons().length).toBe(1);
    });
});