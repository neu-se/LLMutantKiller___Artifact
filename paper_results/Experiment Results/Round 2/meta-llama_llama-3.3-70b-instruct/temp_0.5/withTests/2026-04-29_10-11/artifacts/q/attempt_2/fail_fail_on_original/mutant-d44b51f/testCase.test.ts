import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should return the value when the two values are the same", () => {
        expect(Q.join(1, 1)).toBe(1);
    });

    it("should throw an error with a meaningful message when the values are not the same", () => {
        // This test will fail when the mutation is present
        expect(() => Q.join(1, 2)).toThrowError("Q can't join: not the same: 1 2");
    });
});