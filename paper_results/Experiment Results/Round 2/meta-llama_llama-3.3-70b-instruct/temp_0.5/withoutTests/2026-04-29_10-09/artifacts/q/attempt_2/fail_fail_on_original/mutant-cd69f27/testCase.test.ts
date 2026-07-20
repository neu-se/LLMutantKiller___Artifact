import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when ses is ok", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(true),
            makeQ: jest.fn(),
        };

        // Create a new Q instance
        const q = Q;

        // Check if no error is thrown when ses is ok
        expect(() => {
            // @ts-ignore
            q(function () {
                return {};
            });
        }).not.toThrow();
    });
});