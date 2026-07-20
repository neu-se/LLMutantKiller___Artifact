import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when ses is not ok", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(false),
        };

        // Create a new Q instance
        const q = Q;

        // Check if an error is thrown when ses is not ok
        expect(() => {
            // @ts-ignore
            q(ses);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});