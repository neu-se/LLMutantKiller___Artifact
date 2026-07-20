import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a pending promise", () => {
        const promise = Q.defer().promise;
        expect(promise.isPending()).toBe(true);
        expect(promise.inspect().state).toBe("pending");
    });
});