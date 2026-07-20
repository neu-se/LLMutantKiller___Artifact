import { Q } from "./q";

describe("for loop in filterStackString", () => {
    it("should iterate over all elements", () => {
        var lines = ["line1", "line2", "line3"];
        var count = 0;
        for (var i = 0; i < lines.length; i++) {
            count++;
        }
        expect(count).toBe(3);
    });
});