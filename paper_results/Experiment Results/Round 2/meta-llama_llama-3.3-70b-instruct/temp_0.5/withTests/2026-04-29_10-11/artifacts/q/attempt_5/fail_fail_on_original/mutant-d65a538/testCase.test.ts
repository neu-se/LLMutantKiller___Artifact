import { Q } from "../q";

describe("q.js", () => {
    it("should throw an error if qFileName is null or undefined", () => {
        var originalQFileName = Q.qFileName;
        Q.qFileName = null;
        expect(function() {
            Q.captureLine();
        }).toThrowError();
        Q.qFileName = originalQFileName;
    });
});