describe("Q library", () => {
    it("should check ses condition before checking window and self", () => {
        // Mock the environment to make sure ses is defined
        (global as any).ses = {
            ok: () => true,
        };

        // Load the Q library
        const originalCode = () => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const q = require("../../../../../../../../../../../subject_repositories/q/q.js");
        };

        const mutatedCode = () => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const q = require("../../../../../../../../../../../subject_repositories/q/q.js");
            (global as any).ses = undefined;
        };

        expect(() => originalCode()).not.toThrowError();
        expect(() => mutatedCode()).toThrowError();
    });
});