import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a working inspect method for promises that are rejected", () => {
        const promise = Q.reject(new Error("Test Error"));
        expect(promise.inspect().state).toBe("rejected");
        expect(promise.inspect().reason.message).toBe("Test Error");
    });
});