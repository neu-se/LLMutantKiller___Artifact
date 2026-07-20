import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.join", () => {
    it("should throw an error with a meaningful message when the values are not the same", () => {
        expect(() => Q.join(Q(1), Q(2))).toThrowError("Q can't join: not the same: 1 2");
    });
});