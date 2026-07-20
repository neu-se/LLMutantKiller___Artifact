import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
    it("should define Q when ses is defined and ok", () => {
        // Mock the environment to make sure ses is defined and ok
        (global as any).ses = {
            ok: () => true,
            makeQ: (definition: any) => {
                (global as any).Q = definition();
            },
        };

        // Load the Q library
        require("../../../../../../../../../../../subject_repositories/q/q.js");

        // Check if Q is defined
        expect((global as any).Q).toBeDefined();
    });
});