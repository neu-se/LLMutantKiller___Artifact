import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q Promise Library", () => {
    it("should handle process.domain correctly", () => {
        // Create a mock process object with domain property
        const originalProcess = global.process;
        const processMock = {
            domain: undefined,
        };
        jest.spyOn(global, 'process', 'get').mockReturnValue(processMock);

        // Check if the promise is resolved correctly
        const promise = Q((resolve, reject) => {
            resolve("Test");
        });

        // Check if the promise is resolved correctly
        expect(promise.then((value) => value)).resolves.toBe("Test");

        // Restore the original process object
        jest.restoreAllMocks();
    });
});