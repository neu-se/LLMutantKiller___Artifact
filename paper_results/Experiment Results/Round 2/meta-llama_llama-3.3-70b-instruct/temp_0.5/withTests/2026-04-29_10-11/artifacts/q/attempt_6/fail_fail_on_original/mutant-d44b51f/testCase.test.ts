import { Q } from "./q";

describe("Q.join", () => {
    it("should throw an error when the values are not the same", () => {
        expect(() => Q.join(1, 2)).toThrowError();
    });

    it("should not throw an error when the values are the same", () => {
        expect(() => Q.join(1, 1)).not.toThrowError();
    });
});