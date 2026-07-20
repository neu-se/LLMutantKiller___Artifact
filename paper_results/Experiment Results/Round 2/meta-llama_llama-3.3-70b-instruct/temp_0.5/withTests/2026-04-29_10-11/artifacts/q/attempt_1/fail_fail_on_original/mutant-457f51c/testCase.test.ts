import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a rejected promise with a reason", () => {
        const promise = Q.reject("reason");
        expect(promise.inspect().state).toBe("rejected");
        expect(promise.inspect().reason).toBe("reason");
    });
});