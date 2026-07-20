import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should call the error handler when a progress listener throws", () => {
        const deferred = q.defer();
        const error = new Error("Test error");
        const promise = q.when(deferred.promise, null, null, () => {
            throw error;
        });
        q.onerror = jest.fn();
        deferred.notify();
        deferred.resolve();
        expect(q.onerror).toHaveBeenCalledTimes(1);
        expect(q.onerror).toHaveBeenCalledWith(error);
    });
});