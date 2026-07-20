import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error with a message when the values are not the same", () => {
        const error = new Error();
        try {
            Q.join(1, 2);
        } catch (e) {
            error.message = e.message;
        }
        expect(error.message).toContain("1");
        expect(error.message).toContain("2");
    });
});