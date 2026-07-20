import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should verify delete operation behavior", async () => {
        const obj = { a: 1, b: 2, c: 3 };
        const keysBefore = Object.keys(obj);
        expect(keysBefore).toContain("a");

        await Q(obj).del("a");

        const keysAfter = Object.keys(obj);
        expect(keysAfter).not.toContain("a");
        expect(keysAfter).toEqual(["b", "c"]);
        expect(obj.a).toBeUndefined();
    });
});