const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
    it("should correctly delete property and verify key was passed", async () => {
        const testObject = { testKey: "testValue" };
        const key = "testKey";

        // Intercept the dispatch call to verify the key is passed
        let dispatchCalledWith: any[] = [];
        const originalDispatch = Q(testObject).dispatch;
        Q(testObject).dispatch = function(op: string, args: any[]) {
            dispatchCalledWith = [op, args];
            return originalDispatch.call(this, op, args);
        };

        // Perform the delete operation
        await Q.del(testObject, key);

        // Verify dispatch was called with "delete" and the key
        expect(dispatchCalledWith[0]).toBe("delete");
        expect(dispatchCalledWith[1]).toEqual([key]);
        // Verify the property was actually deleted
        expect(testObject.hasOwnProperty(key)).toBe(false);
    });
});