import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should have a toString method that returns [object Promise]", () => {
        const promise = Q(1);
        expect(Object.prototype.toString.call(promise)).toBe("[object Promise]");
    });
});