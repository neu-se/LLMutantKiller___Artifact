import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return this when nodeback is provided", () => {
        const promise = q(Promise.resolve());
        const nodeback = jest.fn();
        const result = promise.nodeify(nodeback);
        expect(result).toBe(promise);
    });
});