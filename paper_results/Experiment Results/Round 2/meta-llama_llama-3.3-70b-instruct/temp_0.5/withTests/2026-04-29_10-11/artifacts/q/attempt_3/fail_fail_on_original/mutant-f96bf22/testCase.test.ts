import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle promise rejection", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test Error");

        deferred.reject(error);

        promise.then(
            () => {
                throw new Error("Should not be called");
            },
            (err) => {
                expect(err).toBe(error);
            }
        );
    });
});