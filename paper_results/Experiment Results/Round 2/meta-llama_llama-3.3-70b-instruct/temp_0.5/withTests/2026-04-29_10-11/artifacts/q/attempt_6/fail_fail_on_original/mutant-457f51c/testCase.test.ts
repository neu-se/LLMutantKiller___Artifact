import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should only set the exception property when the promise is rejected", () => {
        const rejectedPromise = Q.reject("reason");
        expect(rejectedPromise.exception).toBe("reason");

        const fulfilledPromise = Q(1);
        expect(fulfilledPromise.exception).toBeUndefined();
    });
});