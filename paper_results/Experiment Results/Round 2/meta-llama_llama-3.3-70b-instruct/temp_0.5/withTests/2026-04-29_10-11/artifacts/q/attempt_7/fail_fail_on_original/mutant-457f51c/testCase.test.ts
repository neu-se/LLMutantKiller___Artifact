import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should not set exception property for fulfilled promise", () => {
        const promise = Q(1);
        expect(promise.exception).toBeUndefined();
    });
});