import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function that returns an object with a state property that is 'fulfilled' when resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve();
        const inspectResult = promise.inspect();
        expect(inspectResult.state).toBe("fulfilled");
        expect(inspectResult.value).toBeDefined();
    });
});