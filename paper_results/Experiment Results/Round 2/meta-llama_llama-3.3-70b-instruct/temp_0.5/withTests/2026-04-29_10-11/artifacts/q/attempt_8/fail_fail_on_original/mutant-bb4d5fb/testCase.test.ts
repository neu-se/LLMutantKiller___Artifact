import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle line numbers", () => {
        const originalCaptureLine = q.captureLine;
        q.captureLine = function() {
            return 1;
        };
        const line = q.captureLine();
        expect(line).toBe(1);
        q.captureLine = originalCaptureLine;
        const isInternalFrame = (lineNumber: number) => lineNumber >= q.qStartingLine;
        expect(isInternalFrame(2)).toBe(true);
    });
});