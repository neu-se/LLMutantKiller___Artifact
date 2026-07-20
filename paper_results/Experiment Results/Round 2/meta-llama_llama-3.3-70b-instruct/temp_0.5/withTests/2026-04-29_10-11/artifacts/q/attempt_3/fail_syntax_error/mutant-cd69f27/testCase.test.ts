describe("SES environment", () => {
    it("should set ses.makeQ when ses is ok", () => {
        // Create a mock ses object
        const ses = {
            ok: () => true,
            makeQ: jest.fn()
        };

        // Use the global object to access the Q function
        const globalAny: any = globalThis;
        globalAny.ses = ses;

        // Call Q to test if ses.makeQ is called
        const Q = (function (definition) {
            "use strict";

            // ... (rest of the Q function remains the same)

            // SES (Secure EcmaScript)
            } else if (typeof ses !== "undefined") {
                if (ses.ok()) {
                    ses.makeQ = definition;
                }
            }

            // ... (rest of the Q function remains the same)
        })(function () {
            // ... (rest of the Q function remains the same)
        });

        expect(ses.makeQ).toHaveBeenCalledTimes(1);
        expect(ses.makeQ).toHaveBeenCalledWith(expect.any(Function));
    });
});