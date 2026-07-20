import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return a pending state when inspect is called on a pending promise and have a state property with the value 'pending'", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected).toHaveProperty("state", "pending");
    });
});