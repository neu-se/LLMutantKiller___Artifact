import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = q(10);
        const valueOfResult = promise.valueOf();
        expect(valueOfResult).not.toBeNull();
        expect(valueOfResult).not.toBeUndefined();
    });
});