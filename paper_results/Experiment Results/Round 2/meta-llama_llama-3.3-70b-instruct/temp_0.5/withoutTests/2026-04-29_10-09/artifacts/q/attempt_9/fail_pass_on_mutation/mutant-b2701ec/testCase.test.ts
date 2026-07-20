import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function that returns an object with a state property that is not always 'unknown'", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve();
        const inspectResult = promise.inspect();
        expect(inspectResult.state).not.toBe("unknown");
        expect(Object.keys(inspectResult)).not.toEqual(["state"]);
    });
});