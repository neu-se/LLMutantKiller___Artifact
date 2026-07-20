import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.denodeify", () => {
    it("should not throw an error when trying to wrap a defined function", () => {
        const func = () => {};
        expect(() => Q.denodeify(func)).not.toThrowError();
    });
});