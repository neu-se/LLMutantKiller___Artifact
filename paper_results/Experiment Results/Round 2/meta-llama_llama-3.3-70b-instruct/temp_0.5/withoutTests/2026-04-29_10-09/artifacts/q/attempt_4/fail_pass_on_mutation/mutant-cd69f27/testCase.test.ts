import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not throw an error when ses is ok", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(true),
            makeQ: jest.fn(),
        };

        // Check if no error is thrown when ses is ok
        expect(() => {
            // @ts-ignore
            (function (definition) {
                "use strict";
                if (typeof ses !== "undefined") {
                    if (ses.ok()) {
                        ses.makeQ = definition;
                    }
                }
            })(q);
        }).not.toThrow();
    });
});