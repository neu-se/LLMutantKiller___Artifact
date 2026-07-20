import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should have a toString method that returns a string that includes 'Promise'", () => {
        const promise = Q(1);
        expect(promise.toString()).toContain('Promise');
    });
});