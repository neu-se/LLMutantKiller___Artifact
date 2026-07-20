import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should check if process is not a string", () => {
        expect(typeof process).not.toBe("string");
    });
});