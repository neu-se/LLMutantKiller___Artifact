import q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should reject with a timeout error when the promise is too slow and a custom error message is provided", () => {
        return q.delay(100)
            .timeout(10, "Timed out")
            .then(
                () => {
                    expect(true).toBe(false);
                },
                (error: any) => {
                    expect(error.message).toBe("Timed out after 10 ms");
                    expect(error.code).toBe("ETIMEDOUT");
                }
            );
    });
});