import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should not throw an error when process is defined", () => {
        // Check if Q function does not throw an error when process is defined
        expect(() => Q()).not.toThrowError();
    });
});