import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should call onerror when an error occurs in a promise chain", () => {
        const error = new Error("Test error");

        Q.onerror = jest.fn();

        Q().then(() => {
            throw error;
        }).done();

        // In the original code, this should call Q.onerror
        // In the mutated code, this should not call Q.onerror
        expect(Q.onerror).toHaveBeenCalledTimes(1);
    });
});