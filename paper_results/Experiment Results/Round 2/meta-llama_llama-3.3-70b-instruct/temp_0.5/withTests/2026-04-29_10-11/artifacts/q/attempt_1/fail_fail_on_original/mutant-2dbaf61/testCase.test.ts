import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should throw an error when no error is thrown in the try-catch block", () => {
        expect(() => {
            try {
            } catch (e) {
                Q.hasStacks = !!e.stack;
            }
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});