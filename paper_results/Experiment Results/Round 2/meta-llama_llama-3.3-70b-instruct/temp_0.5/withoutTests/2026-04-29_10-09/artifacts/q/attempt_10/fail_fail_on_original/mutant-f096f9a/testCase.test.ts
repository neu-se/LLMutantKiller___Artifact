import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should throw an error when called with a non-array argument", () => {
        expect(() => Q.any('string')).toThrowError();
    });
});