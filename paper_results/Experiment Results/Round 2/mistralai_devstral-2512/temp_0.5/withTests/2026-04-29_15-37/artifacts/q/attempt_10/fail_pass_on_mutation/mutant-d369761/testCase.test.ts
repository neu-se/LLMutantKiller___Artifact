import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
    it("should correctly filter out inherited properties", async () => {
        const proto = { inherited: "value" };
        const obj = Object.create(proto);
        obj.own1 = "value1";
        obj.own2 = "value2";

        const keys = await Q.keys(obj);

        expect(keys).toEqual(["own1", "own2"]);
        expect(keys.length).toBe(2);
        expect(keys).not.toContain("inherited");
    });
});