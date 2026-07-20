import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when process is an object", () => {
        // Create a mock process object
        const process = { domain: {} };

        // Use jest.spyOn to mock the global process object
        jest.spyOn(global, 'process', 'get').mockImplementation(() => process);

        // Call the done method to test the behavior
        const promise = Q.resolve();
        promise.done();

        // Restore the original process object
        jest.restoreAllMocks();
    });
});