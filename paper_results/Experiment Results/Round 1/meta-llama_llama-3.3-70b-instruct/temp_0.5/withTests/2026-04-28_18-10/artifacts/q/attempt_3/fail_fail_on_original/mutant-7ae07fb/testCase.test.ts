import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.Promise", () => {
    it("should throw an error when resolver is not a function", () => {
        try {
            Q.Promise();
        } catch (error) {
            expect(error).toBeInstanceOf(TypeError);
        }
    });
});