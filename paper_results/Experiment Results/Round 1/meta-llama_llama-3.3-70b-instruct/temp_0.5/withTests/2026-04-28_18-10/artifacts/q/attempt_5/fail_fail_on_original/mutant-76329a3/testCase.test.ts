import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind", () => {
    it("should throw an error when the callback is not a function", () => {
        expect(() => Q.fbind("not a function")).toThrowError();
    });
});