import { Q } from "../q";

describe("q.js", () => {
    it("should capture the line number correctly", () => {
        var lineNumber = Q.captureLine();
        expect(lineNumber).toBeGreaterThan(0);
    });
});