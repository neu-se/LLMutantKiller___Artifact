import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should correctly delete property from object", async () => {
        const obj = { a: 10, b: 20 };
        const result = await Q(obj).del("a");
        expect(result).toBeUndefined();
        expect(obj).toEqual({ b: 20 });
        expect(obj).not.toHaveProperty("a");
    });
});