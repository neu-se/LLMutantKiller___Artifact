import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("pending promise inspect", () => {
    it("should return an object with state property set to 'pending'", () => {
        const deferred = Q.defer();
        const pendingPromise = deferred.promise;
        const inspection = pendingPromise.inspect();
        expect(inspection).toHaveProperty("state");
        expect(inspection.state).toBe("pending");
    });
});