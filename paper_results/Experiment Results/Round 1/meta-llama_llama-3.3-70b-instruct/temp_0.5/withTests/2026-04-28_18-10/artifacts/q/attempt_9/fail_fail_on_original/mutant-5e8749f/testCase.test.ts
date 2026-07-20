import { Q } from "../../../q";

describe("untrackRejection", () => {
    it("should correctly untrack a rejection", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        var rejectionReason = new Error("Test rejection reason");
        Q.trackRejection(promise, rejectionReason);
        var untrackRejectionSpy = jest.spyOn(Q, 'untrackRejection');
        Q.untrackRejection(promise);
        expect(untrackRejectionSpy).toHaveBeenCalledTimes(1);
    });
});