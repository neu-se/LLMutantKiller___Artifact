import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
    it("should return the promise itself when pending and inspected state is pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        if (inspected.state === "pending") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            throw new Error("Promise should be pending");
        }
    });
});