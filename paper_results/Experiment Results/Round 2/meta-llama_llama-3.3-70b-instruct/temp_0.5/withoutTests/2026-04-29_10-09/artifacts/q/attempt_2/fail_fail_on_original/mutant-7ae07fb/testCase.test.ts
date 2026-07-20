import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.promise", () => {
    it("should throw a TypeError with a specific message when the resolver is not a function", () => {
        const error = new Error();
        try {
            Q.promise("not a function");
        } catch (e) {
            error = e;
        }
        expect(error.message).toContain("resolver must be a function");
    });
});