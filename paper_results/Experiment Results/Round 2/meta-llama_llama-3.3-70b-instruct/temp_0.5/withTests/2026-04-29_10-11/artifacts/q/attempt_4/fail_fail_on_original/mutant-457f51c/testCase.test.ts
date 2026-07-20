import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should set the exception property only when the state is rejected", () => {
        const promise = Q.reject("reason");
        const inspected = promise.inspect();
        expect(inspected.state).toBe("rejected");
        expect(inspected.reason).toBe("reason");
        expect(promise.exception).toBe("reason");

        const fulfilledPromise = Q(1);
        expect(fulfilledPromise.exception).toBeUndefined();
    });
});