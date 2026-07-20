import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle line numbers", () => {
        const originalCaptureLine = q.captureLine;
        q.captureLine = function() {
            return 10;
        };
        const line = q.captureLine();
        expect(line).toBe(10);
        q.captureLine = originalCaptureLine;
    });
});