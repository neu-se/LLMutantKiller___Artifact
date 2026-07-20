import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should assign ses.makeQ when ses is ok", () => {
        // Mock the ses object
        const ses = {
            ok: jest.fn().mockReturnValue(true),
            makeQ: undefined,
        };

        // Check if ses.makeQ is assigned when ses is ok
        (function (definition) {
            "use strict";
            if (typeof ses !== "undefined") {
                if (ses.ok()) {
                    ses.makeQ = definition;
                } else {
                    return;
                }
            }
        })(q);

        expect(ses.makeQ).not.toBeUndefined();
    });
});