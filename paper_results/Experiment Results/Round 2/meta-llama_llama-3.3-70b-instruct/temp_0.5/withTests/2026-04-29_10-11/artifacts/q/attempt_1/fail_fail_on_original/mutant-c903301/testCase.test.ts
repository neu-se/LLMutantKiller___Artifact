import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should throw an error when progress listener throws", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        const promise = Q.when(deferred.promise, null, null, () => {
            throw error;
        });
        Q.onerror = jest.fn();
        deferred.resolve();
        expect(Q.onerror).toHaveBeenCalledTimes(1);
        expect(Q.onerror).toHaveBeenCalledWith(error);
    });
});