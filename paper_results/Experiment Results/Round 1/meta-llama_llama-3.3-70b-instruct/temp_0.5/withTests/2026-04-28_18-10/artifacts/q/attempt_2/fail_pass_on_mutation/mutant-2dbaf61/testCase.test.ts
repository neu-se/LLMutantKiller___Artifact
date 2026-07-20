import { Q } from "../../../q";

describe("Q function", () => {
    it("should throw an error when trying to catch an exception in a try-catch block", () => {
        expect(() => {
            try {
                throw new Error();
            } catch (e) {
                // do nothing
            }
        }).not.toThrow();
    });
});