import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should define Q when ses is defined and ok", () => {
        // Mock the environment to make sure ses is defined and ok
        global.ses = {
            ok: () => true,
            makeQ: (definition) => {
                global.Q = definition();
            },
        };

        // Load the Q library
        require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Check if Q is defined
        expect(Q).toBeDefined();
    });
});