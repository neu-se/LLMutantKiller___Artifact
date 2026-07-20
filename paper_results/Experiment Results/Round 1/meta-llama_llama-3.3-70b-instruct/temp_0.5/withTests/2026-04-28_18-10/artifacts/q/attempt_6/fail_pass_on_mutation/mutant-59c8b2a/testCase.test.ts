import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        const promise = q(10);
        expect(typeof promise.valueOf).toBe("function");
        const valueOfResult = promise.valueOf();
        expect(typeof valueOfResult).not.toBe("undefined");
    });
});