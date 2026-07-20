// eslint-disable-next-line @typescript-eslint/no-var-requires
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library", () => {
    it("should not call ses.makeQ when ses is defined but not ok", () => {
        // Mock the environment to make sure ses is defined but not ok
        (global as any).ses = {
            ok: () => false,
            makeQ: jest.fn(),
        };

        // Load the Q library
        require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Check if ses.makeQ is not called
        expect((global as any).ses.makeQ).not.toHaveBeenCalled();
    });
});