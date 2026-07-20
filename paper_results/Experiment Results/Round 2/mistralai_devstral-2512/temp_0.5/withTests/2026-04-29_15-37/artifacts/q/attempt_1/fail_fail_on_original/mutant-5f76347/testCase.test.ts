// Test case to detect the mutation in Q.del function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.del mutation test", () => {
    it("should pass the key to the delete operation", async () => {
        const testObject = { keyToDelete: "value" };
        const key = "keyToDelete";

        // Create a spy to track the dispatch call
        const originalDispatch = testObject.dispatch;
        testObject.dispatch = jest.fn((op: string, args: any[]) => {
            // Verify that the key is passed in the args array
            expect(args).toEqual([key]);
            return originalDispatch ? originalDispatch.call(testObject, op, args) : Promise.resolve();
        });

        // Use Q to wrap the object and call del
        await Q(testObject).del(key);

        // Verify dispatch was called with "delete" operation
        expect(testObject.dispatch).toHaveBeenCalledWith("delete", [key]);
    });
});