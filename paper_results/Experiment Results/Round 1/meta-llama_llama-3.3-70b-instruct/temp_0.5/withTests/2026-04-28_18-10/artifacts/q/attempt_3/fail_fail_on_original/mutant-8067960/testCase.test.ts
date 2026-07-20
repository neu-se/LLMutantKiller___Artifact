import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get functionality", () => {
    it("should throw an error when Q.get is not implemented", () => {
        const object = { a: 1 };
        expect(() => q.get(object, "a")).toThrowError();
    });
});