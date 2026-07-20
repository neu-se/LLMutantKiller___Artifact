import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it("should be able to handle window and self correctly", function () {
        // Create a mock window and self object
        const windowMock = {};
        const selfMock = {};

        // Spy on the Q function to check if it's called with the correct global object
        const originalQ = Q;
        jest.spyOn(global, 'Q').mockImplementation(() => {
            return originalQ;
        });

        // Call the Q function with the mock window and self objects
        (function () {
            "use strict";

            // Montage Require
            if (typeof bootstrap === "function") {
                bootstrap("promise", originalQ);

            // CommonJS
            } else if (typeof exports === "object" && typeof module === "object") {
                module.exports = originalQ();

            // RequireJS
            } else if (typeof define === "function" && define.amd) {
                define(originalQ);

            // SES (Secure EcmaScript)
            } else if (typeof ses !== "undefined") {
                if (!ses.ok()) {
                    return;
                } else {
                    ses.makeQ = originalQ;
                }

            // <script>
            } else if (typeof windowMock !== "undefined" || typeof selfMock !== "undefined") {
                // Prefer window over self for add-on scripts. Use self for
                // non-windowed contexts.
                var global = typeof windowMock !== "undefined" ? windowMock : selfMock;

                // Get the `window` object, save the previous Q global
                // and initialize Q as a global.
                var previousQ = global.Q;
                global.Q = originalQ();

                // Add a noConflict function so Q can be removed from the
                // global namespace.
                global.Q.noConflict = function () {
                    global.Q = previousQ;
                    return this;
                };

            } else {
                throw new Error("This environment was not anticipated by Q. Please file a bug.");
            }

        })();
    });
});