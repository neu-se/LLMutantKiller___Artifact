const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
    it("should verify the key parameter is passed to delete operation", async () => {
        const testObject = { key1: "value1", key2: "value2" };
        const keyToDelete = "key1";

        // Create a mock object that tracks delete calls
        const mockObject = {
            [keyToDelete]: "value1",
            key2: "value2",
            deletedKeys: [] as string[]
        };

        // Override delete operator behavior
        const handler = {
            deleteProperty(target: any, prop: string) {
                target.deletedKeys.push(prop);
                return delete target[prop];
            }
        };

        const proxiedObject = new Proxy(mockObject, handler);

        // Use Q.del which should trigger the delete operation
        await Q.del(proxiedObject, keyToDelete);

        // Verify the correct key was passed to delete
        expect(proxiedObject.deletedKeys).toContain(keyToDelete);
        expect(proxiedObject.hasOwnProperty(keyToDelete)).toBe(false);
    });
});