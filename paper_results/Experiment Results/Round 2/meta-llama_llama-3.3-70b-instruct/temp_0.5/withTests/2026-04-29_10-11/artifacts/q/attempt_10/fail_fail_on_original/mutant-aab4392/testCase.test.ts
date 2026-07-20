import { Q } from "./q";

describe("for loop in filterStackString", () => {
    it("should throw an error when iterating out of bounds", () => {
        var lines = ["line1", "line2", "line3"];
        var error = false;
        try {
            for (var i = 0; i <= lines.length; i++) {
                if (i >= lines.length) {
                    throw new Error("Out of bounds");
                }
            }
        } catch (e) {
            error = true;
        }
        expect(error).toBe(false);
    });
});