import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should return a pending promise when valueOf is called on a promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const inspected = promise.inspect();
        if (inspected.state === "pending") {
            expect(promise.valueOf()).toBe(promise);
        } else {
            expect(inspected.state).toBe("pending");
        }
        expect(promise.isPending()).toBe(true);
    });
});