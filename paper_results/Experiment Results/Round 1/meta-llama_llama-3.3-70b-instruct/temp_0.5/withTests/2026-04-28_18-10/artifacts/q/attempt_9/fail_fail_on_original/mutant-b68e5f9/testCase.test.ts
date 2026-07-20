import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return this when nodeback is provided in the original code and throw an error in the mutated code", () => {
        const promise = q(Promise.resolve());
        const nodeback = jest.fn();
        try {
            const result = promise.nodeify(nodeback);
            if (result === undefined) {
                throw new Error("Result is undefined");
            }
        } catch (error) {
            expect(error.message).not.toBe("Result is undefined");
        }
    });
});