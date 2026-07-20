import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should capture the line number correctly", () => {
        var originalCaptureLine = Q.captureLine;
        Q.captureLine = function() {
            return 10;
        }
        var lineNumber = Q.captureLine();
        expect(lineNumber).toBe(10);
        Q.captureLine = originalCaptureLine;
    });
});