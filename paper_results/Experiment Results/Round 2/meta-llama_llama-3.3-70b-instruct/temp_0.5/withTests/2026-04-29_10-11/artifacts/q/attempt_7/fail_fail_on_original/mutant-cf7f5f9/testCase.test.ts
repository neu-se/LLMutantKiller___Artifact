import { Q } from "../q";

describe("Q", () => {
    it("should call Q.onerror with the correct error when an error occurs in a promise chain", () => {
        let errorCalled = false;
        let errorReason: any;
        Q.onerror = (error: any) => {
            errorCalled = true;
            errorReason = error;
        };

        Q().then(() => {
            throw new Error("Test error");
        }).done();

        expect(errorCalled).toBe(true);
        expect(errorReason.message).toBe("Test error");
    });
});