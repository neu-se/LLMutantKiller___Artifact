import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply function", () => {
    it("should throw an error when called without implementation", () => {
        const callback = jest.fn();
        expect(() => q.nfapply(callback, [1, 2, 3])).toThrow();
    });
});