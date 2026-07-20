import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the valueOf method for fulfilled promises", () => {
        const promise = Q(10);

        expect(promise.valueOf()).toBe(10);
    });
});