import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("captureLine", () => {
    it("should capture the line number correctly", () => {
        const originalCaptureLine = Q.captureLine;
        const lineNumber = originalCaptureLine();
        expect(lineNumber).toBeGreaterThan(0);
    });
});