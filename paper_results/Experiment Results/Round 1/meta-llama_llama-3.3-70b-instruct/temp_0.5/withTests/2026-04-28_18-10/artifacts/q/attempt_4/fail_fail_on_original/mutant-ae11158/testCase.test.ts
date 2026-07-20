import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nfapply function", () => {
    it("should throw an error when Q.nfapply is an empty function", async () => {
        const originalNfapply = Q.nfapply;
        Q.nfapply = function () {};
        await expect(Q.nfapply(function () {}, [])).rejects.toThrow();
        Q.nfapply = originalNfapply;
    });
});