import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.denodeify", () => {
    it("should throw an error when denodeifying a non-function", () => {
        expect(() => Q.denodeify("not a function")).toThrowError();
    });
});