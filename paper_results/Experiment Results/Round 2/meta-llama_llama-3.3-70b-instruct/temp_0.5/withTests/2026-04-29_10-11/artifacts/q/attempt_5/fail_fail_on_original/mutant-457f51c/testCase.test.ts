import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not set the exception property when the state is not rejected", () => {
        const promise = Q(1);
        expect(promise.exception).toBeUndefined();
    });
});