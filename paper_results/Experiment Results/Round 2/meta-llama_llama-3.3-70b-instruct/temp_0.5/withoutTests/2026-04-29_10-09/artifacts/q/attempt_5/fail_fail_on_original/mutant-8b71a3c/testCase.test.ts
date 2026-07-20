import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return the promise itself when valueOf is called on a pending promise with inspected state pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        expect(inspected.state).toBe("pending");
        if (inspected.state === "pending") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            throw new Error("Promise is not pending");
        }
    });
});