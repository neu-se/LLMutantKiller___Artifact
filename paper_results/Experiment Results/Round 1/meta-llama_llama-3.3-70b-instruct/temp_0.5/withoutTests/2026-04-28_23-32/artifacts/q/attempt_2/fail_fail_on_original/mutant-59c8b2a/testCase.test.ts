import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should return a promise when valueOf is called on a fulfilled promise", () => {
        const promise = Q(5);
        expect(promise.valueOf()).toBe(5);
    });
});