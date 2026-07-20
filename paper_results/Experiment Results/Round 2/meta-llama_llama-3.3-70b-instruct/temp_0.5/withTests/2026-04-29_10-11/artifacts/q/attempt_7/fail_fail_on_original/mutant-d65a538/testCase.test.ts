import { Q } from "../q";

describe("q.js", () => {
    it("should not return null when captureLine is called", () => {
        var result = Q.captureLine();
        expect(result).not.toBeNull();
    });
});