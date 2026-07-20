import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not set the exception property when the state is not rejected", () => {
        const promise = Q(1);
        const inspected = promise.inspect();
        expect(inspected.state).toBe("fulfilled");
        expect(inspected.value).toBe(1);
        expect(promise.exception).toBeUndefined();
    });
});