import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should return when ses is ok and then clause is executed", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(true),
        };

        // Check if the function returns when ses is ok
        const result = (function (definition) {
            "use strict";
            if (typeof ses !== "undefined") {
                if (ses.ok()) {
                    return "something";
                }
            }
        })(q);

        expect(result).toBe("something");
    });
});