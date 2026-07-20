import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.async function", () => {
    it("should throw an error when the generator is not a function", () => {
        expect(() => Q.async("not a function")).toThrowError(
            "resolver must be a function."
        );
    });
});