import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should handle process object correctly", () => {
        const processObject = { domain: true };
        const result = Q.defer().resolve(processObject);
        expect(result).not.toBeNull();
    });
});