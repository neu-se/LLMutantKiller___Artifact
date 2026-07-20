import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.any", () => {
    it("should reject if all promises are rejected", async () => {
        const promises = [
            Q.reject("error1"),
            Q.reject("error2"),
            Q.reject("error3"),
        ];

        await expect(Q.any(promises)).rejects.toThrowError(
            "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: error3"
        );
    });
});