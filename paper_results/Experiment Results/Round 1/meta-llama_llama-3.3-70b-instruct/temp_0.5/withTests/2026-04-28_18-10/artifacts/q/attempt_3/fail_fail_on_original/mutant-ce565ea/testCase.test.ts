import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the valueOf method for pending promises", () => {
        const promise = Q.defer().promise;

        expect(promise.valueOf()).toBe(promise);
    });
});