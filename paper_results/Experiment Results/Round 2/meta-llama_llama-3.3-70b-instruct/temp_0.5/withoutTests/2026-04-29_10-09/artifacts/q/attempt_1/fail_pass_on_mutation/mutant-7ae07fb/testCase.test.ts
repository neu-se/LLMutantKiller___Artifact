import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise", () => {
    it("should throw a TypeError with a meaningful message when the resolver is not a function", () => {
        expect(() => Q.promise("not a function")).toThrowError(
            TypeError,
            "resolver must be a function."
        );
    });
});