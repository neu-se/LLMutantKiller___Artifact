import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when the values are not the same and the error is an instance of Error", () => {
        let error;
        try {
            Q.join(1, 2);
        } catch (e) {
            error = e;
        }
        expect(error).toBeInstanceOf(Error);
    });
});