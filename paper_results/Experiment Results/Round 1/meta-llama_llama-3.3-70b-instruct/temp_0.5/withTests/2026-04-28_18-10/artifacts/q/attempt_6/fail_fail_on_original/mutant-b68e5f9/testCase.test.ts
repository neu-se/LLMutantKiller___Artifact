import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return this when nodeback is provided in the original code but return undefined in the mutated code", () => {
        const promise = q(Promise.resolve());
        const nodeback = jest.fn();
        const result = promise.nodeify(nodeback);
        if (result === undefined) {
            throw new Error("Mutated code detected");
        }
        expect(result).toBe(promise);
    });
});