const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
    it("should pass the key to the delete operation", async () => {
        const testObject = { keyToDelete: "value" };
        const key = "keyToDelete";

        // Mock the dispatch method to track calls
        const originalDispatch = Q(testObject).dispatch;
        const mockDispatch = jest.fn((op: string, args: any[]) => {
            // Verify that the key is passed in the args array
            expect(args).toEqual([key]);
            return originalDispatch.call(Q(testObject), op, args);
        });

        // Replace dispatch with our mock
        Q(testObject).dispatch = mockDispatch;

        // Call del which should use our mocked dispatch
        await Q(testObject).del(key);

        // Verify dispatch was called with "delete" operation and correct args
        expect(mockDispatch).toHaveBeenCalledWith("delete", [key]);
    });
});