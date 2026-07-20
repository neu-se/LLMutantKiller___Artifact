import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when Q.join is called with no implementation", () => {
        expect(() => q.join()).toThrowError();
    });
});