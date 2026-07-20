import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should fail when dispatching empty operation name", async () => {
        const obj = { a: 10 };
        const promise = Q(obj).del("a");
        await expect(promise).rejects.toBeDefined();
    });
});