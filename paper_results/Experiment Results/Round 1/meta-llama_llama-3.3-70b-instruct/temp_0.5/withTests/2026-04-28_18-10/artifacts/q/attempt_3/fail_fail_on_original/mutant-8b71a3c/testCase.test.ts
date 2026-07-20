import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should handle valueOf correctly for rejected promises", () => {
        const promise = Q.reject("error");
        expect(promise.valueOf()).toBe(promise);
    });
});