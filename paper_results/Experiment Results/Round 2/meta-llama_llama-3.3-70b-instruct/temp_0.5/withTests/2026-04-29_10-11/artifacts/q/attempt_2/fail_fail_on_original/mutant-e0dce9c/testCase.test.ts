import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should behave differently for inspected.state !== 'rejected'", () => {
        const promise = Q.reject(new Error("Test"));
        const inspected = promise.inspect();
        expect(inspected.state).toBe("rejected");
        const valueOf = promise.valueOf();
        expect(valueOf).toBe(promise);
    });
});