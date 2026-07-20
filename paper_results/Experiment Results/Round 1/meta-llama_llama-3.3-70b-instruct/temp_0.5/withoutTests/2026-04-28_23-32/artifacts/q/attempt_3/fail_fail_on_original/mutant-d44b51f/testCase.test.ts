import { Q } from "./q";

describe("Q.join", () => {
    it("should throw an error when the values are not the same", () => {
        expect(() => Q.join(Q(1), Q(2))).toThrow();
    });
});