import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function that returns state 'pending' when not resolved, and 'fulfilled' when resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect().state).toBe("pending");
        deferred.resolve();
        expect(promise.inspect().state).toBe("fulfilled");
    });
});