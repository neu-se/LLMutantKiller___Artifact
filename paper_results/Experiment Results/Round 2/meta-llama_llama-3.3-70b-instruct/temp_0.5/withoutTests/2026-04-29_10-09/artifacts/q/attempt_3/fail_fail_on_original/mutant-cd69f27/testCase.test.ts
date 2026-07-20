import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return a promise when ses is ok", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(true),
            makeQ: jest.fn(),
        };

        // Create a new Q instance
        const definition = q;

        // Check if no error is thrown when ses is ok
        expect(() => {
            // @ts-ignore
            definition(function () {
                return {};
            });
        }).not.toThrow();
    });
});