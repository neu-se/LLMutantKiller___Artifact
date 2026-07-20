import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay function", () => {
    it("should throw an error when Q.delay is called with no arguments", () => {
        expect(() => Q.delay()).toThrowError();
    });
});