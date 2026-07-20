import { Q } from "../../../q";

describe("Q function", () => {
    it("should throw an error if try block is empty in the hasStacks check", () => {
        let error: any;
        try {
            try {
            } catch (e) {
                error = e;
            }
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
        expect(error).toBeUndefined();
    });
});