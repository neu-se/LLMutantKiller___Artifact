import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return a promise when nodeback is provided", () => {
        const promise = q(Promise.resolve());
        const nodeback = jest.fn();
        const result = promise.nodeify(nodeback);
        expect(typeof result.then).toBe('function');
    });
});