import { Q } from "./q";

describe("Q.join", () => {
    it("should throw an error when the values are not the same and the error message contains the values", () => {
        let errorMessage;
        try {
            Q.join(1, 2);
        } catch (e: any) {
            errorMessage = e.message;
        }
        expect(errorMessage).toContain("1");
        expect(errorMessage).toContain("2");
    });
});