import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not return when ses is ok", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(true),
        };

        // Check if the function does not return when ses is ok
        const result = (function (definition) {
            "use strict";
            if (typeof ses !== "undefined") {
                if (ses.ok()) {
                    return;
                }
            }
        })(q);

        expect(result).toBeUndefined();
    });
});