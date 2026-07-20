import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not always set the exception property", () => {
        const promise = Q.reject("reason");
        const inspected = promise.inspect();
        expect(inspected.state).toBe("rejected");
        expect(inspected.reason).toBe("reason");
        const promise2 = Q(promise);
        const inspected2 = promise2.inspect();
        expect(inspected2.state).toBe("rejected");
        expect(inspected2.reason).toBe("reason");
        expect(promise2.exception).toBeUndefined();
    });
});