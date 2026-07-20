import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
    it("should correctly handle objects with inherited properties", async () => {
        const proto = { inheritedProp: "inherited" };
        const obj = Object.create(proto);
        obj.ownProp1 = "value1";
        obj.ownProp2 = "value2";

        const keys = await Q.keys(obj);

        expect(keys).toEqual(["ownProp1", "ownProp2"]);
        expect(keys.length).toBe(2);
        expect(keys).not.toContain("inheritedProp");
    });
});