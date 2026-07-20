// eslint-disable-next-line @typescript-eslint/no-var-requires
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library", () => {
    it("should throw an error when ses is not defined and window/self is not available", () => {
        // Mock the environment to make sure ses, window, and self are not defined
        delete (global as any).ses;
        delete (global as any).window;
        delete (global as any).self;

        // Load the Q library
        expect(() => {
            require("../../../../../../../../../../../subject_repositories/q/q.js");
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});