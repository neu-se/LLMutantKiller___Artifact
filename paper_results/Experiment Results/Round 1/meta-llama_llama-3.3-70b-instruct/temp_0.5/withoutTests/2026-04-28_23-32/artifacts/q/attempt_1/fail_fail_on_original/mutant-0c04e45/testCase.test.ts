import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle generator errors correctly", () => {
        const asyncFunction = Q.async(function* () {
            yield Promise.resolve(1);
            throw new Error("Test error");
        });

        expect.assertions(1);
        asyncFunction().catch((error: any) => {
            expect(error.message).toBe("Test error");
        });
    });
});