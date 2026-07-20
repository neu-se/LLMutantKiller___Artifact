import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
    it("should correctly extract only own enumerable properties from an object", async () => {
        const obj = Object.create({ inheritedProp: "inherited" });
        obj.ownProp1 = "value1";
        obj.ownProp2 = "value2";

        const keys = await Q.keys(obj);

        expect(keys).toEqual(["ownProp1", "ownProp2"]);
        expect(keys).not.toContain("inheritedProp");
    });
});