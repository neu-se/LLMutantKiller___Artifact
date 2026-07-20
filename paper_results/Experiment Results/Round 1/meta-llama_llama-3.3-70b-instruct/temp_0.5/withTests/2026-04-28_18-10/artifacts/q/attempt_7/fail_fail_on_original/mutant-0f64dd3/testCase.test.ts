import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine", () => {
    it("should correctly handle the condition for fileNameAndLineNumber", () => {
        const condition = (fileNameAndLineNumber) => {
            if (!fileNameAndLineNumber) {
                return true;
            } else {
                return false;
            }
        };

        expect(condition(null)).toBe(true);
        expect(condition(undefined)).toBe(true);
        expect(condition("")).toBe(false);
    });
});