import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should return a promise when valueOf is called on a pending promise", () => {
        const promise = Q.defer().promise;
        expect(promise.valueOf()).toBe(promise);
    });
});