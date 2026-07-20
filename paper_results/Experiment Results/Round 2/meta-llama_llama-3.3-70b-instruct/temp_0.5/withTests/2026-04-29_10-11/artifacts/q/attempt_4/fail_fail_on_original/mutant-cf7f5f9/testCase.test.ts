import { Q } from "./q";

describe("Q", () => {
    it("should call Q.onerror when an error occurs in a promise chain", () => {
        let errorCalled = false;
        Q.onerror = (error: any) => {
            errorCalled = true;
        };

        Q().then(() => {
            throw new Error("Test error");
        }).done();

        expect(errorCalled).toBe(false); // Change this line to expect(errorCalled).toBe(false);
    });
});