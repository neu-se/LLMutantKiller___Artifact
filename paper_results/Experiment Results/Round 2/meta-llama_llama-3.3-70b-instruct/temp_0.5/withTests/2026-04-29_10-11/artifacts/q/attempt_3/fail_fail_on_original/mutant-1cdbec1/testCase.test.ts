import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it("should be able to handle window and self correctly", function () {
        // Create a mock window and self object
        const windowMock = {};
        const selfMock = {};

        // Set up the global object
        const globalObject = {
            window: windowMock,
            self: selfMock,
        };

        // Call the Q function with the mock window and self objects
        (function (global) {
            "use strict";

            // Montage Require
            if (typeof bootstrap === "function") {
                bootstrap("promise", Q);

            // CommonJS
            } else if (typeof exports === "object" && typeof module === "object") {
                module.exports = Q();

            // RequireJS
            } else if (typeof define === "function" && define.amd) {
                define(Q);

            // SES (Secure EcmaScript)
            } else if (typeof ses !== "undefined") {
                if (!ses.ok()) {
                    return;
                } else {
                    ses.makeQ = Q;
                }

            // <script>
            } else if (typeof global.window !== "undefined" || typeof global.self !== "undefined") {
                // Prefer window over self for add-on scripts. Use self for
                // non-windowed contexts.
                var globalObject = typeof global.window !== "undefined" ? global.window : global.self;

                // Get the `window` object, save the previous Q global
                // and initialize Q as a global.
                var previousQ = globalObject.Q;
                globalObject.Q = Q();

                // Add a noConflict function so Q can be removed from the
                // global namespace.
                globalObject.Q.noConflict = function () {
                    globalObject.Q = previousQ;
                    return this;
                };

            } else {
                throw new Error("This environment was not anticipated by Q. Please file a bug.");
            }

        })(globalObject);

        // Check if Q is defined in the global object
        expect(globalObject.window.Q).toBeDefined();
        expect(globalObject.self.Q).toBeDefined();
    });
});