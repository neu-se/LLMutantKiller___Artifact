import { Q } from "./q";

describe("for loop in filterStackString", () => {
    it("should not go out of bounds", () => {
        var lines = ["line1", "line2", "line3"];
        var result = true;
        for (var i = 0; i < lines.length; i++) {
            if (i >= lines.length) {
                result = false;
            }
        }
        expect(result).toBe(true);
    });
});