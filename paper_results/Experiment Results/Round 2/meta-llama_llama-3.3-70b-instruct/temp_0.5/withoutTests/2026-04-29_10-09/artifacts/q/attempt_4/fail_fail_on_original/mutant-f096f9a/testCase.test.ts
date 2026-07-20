import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.any function", () => {
    it("should throw an error when no promises are provided", () => {
        expect(() => Q.any()).toThrow();
    });
});