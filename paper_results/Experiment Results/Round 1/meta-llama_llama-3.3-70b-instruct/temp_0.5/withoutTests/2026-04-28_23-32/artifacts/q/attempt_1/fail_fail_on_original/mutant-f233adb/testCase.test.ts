import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should throw an error when ses is not defined and window/self is not available", () => {
        // Mock the environment to make sure ses, window, and self are not defined
        jest.spyOn(global, 'ses', 'get').mockReturnValue(undefined);
        jest.spyOn(global, 'window', 'get').mockReturnValue(undefined);
        jest.spyOn(global, 'self', 'get').mockReturnValue(undefined);

        // Try to load the Q library
        expect(() => {
            Q;
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});