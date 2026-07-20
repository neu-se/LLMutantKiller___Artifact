const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
    it("should pass the correct key to the delete operation", async () => {
        const testObject = { key1: "value1", key2: "value2" };
        const keyToDelete = "key1";

        // Track what gets passed to dispatch
        let capturedArgs: any[] = [];
        const originalDispatch = Q(testObject).dispatch;
        Q(testObject).dispatch = jest.fn((op: string, args: any[]) => {
            if (op === "delete") {
                capturedArgs = args;
            }
            return originalDispatch.call(Q(testObject), op, args);
        });

        // Perform the delete operation
        await Q(testObject).del(keyToDelete);

        // Verify the correct key was passed
        expect(capturedArgs).toEqual([keyToDelete]);
        // Verify the property was actually deleted
        expect(testObject.hasOwnProperty(keyToDelete)).toBe(false);
    });
});