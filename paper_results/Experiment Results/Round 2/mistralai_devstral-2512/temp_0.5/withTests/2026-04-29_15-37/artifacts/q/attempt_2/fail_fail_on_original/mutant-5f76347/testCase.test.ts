import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del behavior test", () => {
    it("should correctly delete a property from an object", async () => {
        const testObject = { testKey: "testValue" };
        const key = "testKey";

        // Use Q.del to delete the property
        await Q.del(testObject, key);

        // Verify the property was deleted
        expect(testObject.hasOwnProperty(key)).toBe(false);
    });
});