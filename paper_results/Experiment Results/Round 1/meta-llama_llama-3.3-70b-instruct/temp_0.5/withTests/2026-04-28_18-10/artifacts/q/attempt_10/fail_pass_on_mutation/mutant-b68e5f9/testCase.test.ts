import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when nodeback is provided in the original code", () => {
        const promise = q(Promise.resolve());
        const nodeback = jest.fn();
        expect(() => promise.nodeify(nodeback)).not.toThrow();
    });
});