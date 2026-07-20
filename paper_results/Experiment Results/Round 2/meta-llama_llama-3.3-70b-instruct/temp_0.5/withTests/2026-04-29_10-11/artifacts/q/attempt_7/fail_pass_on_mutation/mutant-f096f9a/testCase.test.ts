import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any", () => {
    it("should throw an error when Q.any is called with no arguments", () => {
        expect(() => Q.any()).toThrowError();
    });
});