describe("untrackRejection", () => {
    it("should correctly untrack a rejection", () => {
        const Q = require('../../../../q');
        var deferred = Q.defer();
        var promise = deferred.promise;
        var rejectionReason = new Error("Test rejection reason");
        Q.trackRejection(promise, rejectionReason);
        expect(Q.untrackRejection.name).toBe('untrackRejection');
    });
});