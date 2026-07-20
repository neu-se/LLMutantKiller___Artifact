import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the promise itself when pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe("pending");
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).toBe(promise);
        expect(valueOfResult).not.toBeUndefined();
        expect(valueOfResult).not.toBeNull();
        expect(valueOfResult).toBeInstanceOf(Object);
        expect(valueOfResult.constructor.name).toBe("Promise");
    });
});