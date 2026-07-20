import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should correctly dispatch 'delete' operation", async () => {
        const obj = { a: 10 };
        const result = await Q(obj).del("a");
        expect(result).toBeUndefined();
        expect(obj).not.toHaveProperty("a");
    });
});