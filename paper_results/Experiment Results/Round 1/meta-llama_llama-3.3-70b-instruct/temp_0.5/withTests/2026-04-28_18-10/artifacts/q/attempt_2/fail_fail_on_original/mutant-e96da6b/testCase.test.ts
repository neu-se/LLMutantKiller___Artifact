import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should throw an error when called with no arguments", () => {
        expect(() => Q.delay()).toThrowError();
    });
});