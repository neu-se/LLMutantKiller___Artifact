import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.denodeify", () => {
    it("should throw an error when the callback is undefined", () => {
        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });
});