import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when environment is not anticipated", () => {
        // We need to mock the ses object to test the behavior
        (global as any).ses = undefined;
        (global as any).window = undefined;
        (global as any).self = undefined;

        expect(() => {
            Q(null);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // Restore the original ses object
        delete (global as any).ses;
        delete (global as any).window;
        delete (global as any).self;
    });
});