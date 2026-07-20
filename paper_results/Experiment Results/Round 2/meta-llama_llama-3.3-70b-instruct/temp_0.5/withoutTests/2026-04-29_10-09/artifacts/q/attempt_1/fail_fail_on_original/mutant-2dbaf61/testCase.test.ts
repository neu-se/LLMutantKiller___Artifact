import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should have hasStacks set to true when Error object has a stack property", () => {
        const originalHasStacks = Q.hasStacks;
        expect(originalHasStacks).toBe(true);
    });
});