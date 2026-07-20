import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fail", () => {
    it("should have a catch method", () => {
        const promise = q(10);
        expect(promise).toHaveProperty("catch");
    });
});