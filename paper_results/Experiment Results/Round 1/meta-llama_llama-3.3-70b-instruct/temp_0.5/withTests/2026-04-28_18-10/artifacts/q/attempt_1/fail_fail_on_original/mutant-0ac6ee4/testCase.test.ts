import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should reject with a timeout error when the promise is too slow and a custom error message is provided", () => {
        return Q.delay(100)
            .timeout(10, "Timed out")
            .then(
                () => {
                    expect(true).toBe(false);
                },
                (error) => {
                    expect(error.message).toBe("Timed out");
                    expect(error.code).toBe("ETIMEDOUT");
                }
            );
    });
});