import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should throw an error when resolver is not a function", () => {
        expect(() => Q.promise("")).toThrowError();
    });
});