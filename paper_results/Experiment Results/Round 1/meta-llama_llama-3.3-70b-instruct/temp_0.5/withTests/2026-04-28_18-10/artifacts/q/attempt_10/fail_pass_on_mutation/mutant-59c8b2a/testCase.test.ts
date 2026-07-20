import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = q(10);
        expect(Object.keys(promise)).toContain('valueOf');
        expect(typeof promise.valueOf).toBe('function');
    });
});