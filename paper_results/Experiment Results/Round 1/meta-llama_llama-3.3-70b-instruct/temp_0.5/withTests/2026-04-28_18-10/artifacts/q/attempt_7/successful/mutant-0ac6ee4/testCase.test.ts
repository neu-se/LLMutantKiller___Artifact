import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should reject with a timeout error when the promise is too slow and the error message should contain 'ms'", () => {
        return q(10).delay(100)
            .timeout(10)
            .then(
                () => {
                    expect(true).toBe(false);
                },
                (error: any) => {
                    expect(error.message).toContain("ms");
                    expect(error.code).toBe("ETIMEDOUT");
                }
            );
    });
});