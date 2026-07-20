// eslint-disable-next-line @typescript-eslint/no-var-requires
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library", () => {
    it("should call ses.makeQ when ses is defined and ok", () => {
        // Mock the environment to make sure ses is defined and ok
        (global as any).ses = {
            ok: () => true,
            makeQ: jest.fn(),
        };

        // Load the Q library
        require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Check if ses.makeQ is called
        expect((global as any).ses.makeQ).toHaveBeenCalledTimes(1);
    });
});