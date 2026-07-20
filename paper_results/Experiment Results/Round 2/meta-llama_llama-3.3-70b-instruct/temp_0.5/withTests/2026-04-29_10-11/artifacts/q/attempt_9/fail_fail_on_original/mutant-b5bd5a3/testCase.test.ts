import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a working valueOf method for promises", () => {
        const promise = Q(10);
        // In the mutated code, the valueOf method is not defined, so this should fail
        expect(promise.valueOf()).toBe(10);
    });
});