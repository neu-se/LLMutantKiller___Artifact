import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should throw an error when captureLine returns null", () => {
        var originalCaptureLine = Q.captureLine;
        Q.captureLine = function() {
            return null;
        }
        expect(function() {
            Q.captureLine();
        }).toThrowError();
        Q.captureLine = originalCaptureLine;
    });
});