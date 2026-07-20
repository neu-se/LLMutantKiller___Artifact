import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
    it("should correctly filter out inherited properties from objects", async () => {
        const proto = { inheritedProp: "inherited" };
        const obj = Object.create(proto);
        obj.ownProp = "own";

        const keys = await Q.keys(obj);

        expect(keys).toEqual(["ownProp"]);
        expect(keys.length).toBe(1);
        expect(keys).not.toContain("inheritedProp");
    });
});