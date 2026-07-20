import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should correctly handle delete operation on object", async () => {
        const obj = { prop: "value" };
        const result = await Q(obj).del("prop");
        expect(result).toBeUndefined();
        expect("prop" in obj).toBe(false);

        // Additional check to ensure the operation was actually performed
        const obj2 = { a: 1, b: 2 };
        await Q(obj2).del("a");
        expect(obj2).toEqual({ b: 2 });
    });
});