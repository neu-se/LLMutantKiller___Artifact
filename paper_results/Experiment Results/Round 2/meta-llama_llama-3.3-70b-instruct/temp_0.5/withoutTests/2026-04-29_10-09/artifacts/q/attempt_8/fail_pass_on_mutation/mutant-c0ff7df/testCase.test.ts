import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
    it("should dispatch a get operation with the correct property name", async () => {
        const obj = { foo: "bar" };
        const key = "foo";
        const result = await q(obj).get(key);
        expect(result).toBe("bar");
        const getFunction = q(obj).get.toString();
        expect(getFunction).toContain("get");
    });
});