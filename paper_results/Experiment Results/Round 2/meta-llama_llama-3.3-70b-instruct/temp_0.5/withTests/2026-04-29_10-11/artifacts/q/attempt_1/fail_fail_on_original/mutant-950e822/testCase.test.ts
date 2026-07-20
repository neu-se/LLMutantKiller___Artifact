import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have a working toString method for promises", () => {
        const promise = Q(10);
        expect(promise.toString()).toBe("[object Promise]");
    });
});