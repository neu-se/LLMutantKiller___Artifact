import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.join", () => {
    it("should throw an error with a specific message when the values are not the same", () => {
        let errorMessage;
        try {
            Q.join(1, 2);
        } catch (e: any) {
            errorMessage = e.message;
        }
        expect(errorMessage).toContain("Q can't join: not the same: 1 2");
    });
});