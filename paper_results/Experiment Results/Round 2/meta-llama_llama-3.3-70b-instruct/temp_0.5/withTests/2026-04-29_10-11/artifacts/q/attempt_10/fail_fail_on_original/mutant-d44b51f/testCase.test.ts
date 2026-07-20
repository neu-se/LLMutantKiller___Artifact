import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error when the values are not the same and the error message does not contain the values", () => {
        let errorMessage;
        try {
            Q.join(1, 2);
        } catch (e: any) {
            errorMessage = e.message;
        }
        expect(errorMessage).not.toContain("1");
        expect(errorMessage).not.toContain("2");
    });
});