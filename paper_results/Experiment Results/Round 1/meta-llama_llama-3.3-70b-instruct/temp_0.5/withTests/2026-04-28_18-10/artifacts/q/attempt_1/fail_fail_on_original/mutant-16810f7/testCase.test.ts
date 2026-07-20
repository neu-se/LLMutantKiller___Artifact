import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle unhandled rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test error");

        Q.onerror = jest.fn();
        Q.untrackRejection = jest.fn();

        deferred.reject(error);

        expect(Q.onerror).toHaveBeenCalledTimes(1);
        expect(Q.onerror).toHaveBeenCalledWith(error);

        expect(Q.untrackRejection).toHaveBeenCalledTimes(1);
        expect(Q.untrackRejection).toHaveBeenCalledWith(promise);
    });
});