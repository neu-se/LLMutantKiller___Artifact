import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when trying to reject a promise with no reason", () => {
        expect(() => Q.reject()).toThrowError();
    });
});