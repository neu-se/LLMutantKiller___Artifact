import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should reject when trying to delete from non-object", async () => {
        const promise = Q(42).del("a");
        await expect(promise).rejects.toBeDefined();
    });
});