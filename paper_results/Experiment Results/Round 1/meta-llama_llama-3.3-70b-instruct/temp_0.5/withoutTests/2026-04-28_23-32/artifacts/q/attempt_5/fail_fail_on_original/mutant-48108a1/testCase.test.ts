import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should throw an error when inspect is called on a pending promise and the result is not an object", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        if (typeof inspected !== "object" || inspected === null) {
            throw new Error("Inspect result is not an object");
        }
    });
});