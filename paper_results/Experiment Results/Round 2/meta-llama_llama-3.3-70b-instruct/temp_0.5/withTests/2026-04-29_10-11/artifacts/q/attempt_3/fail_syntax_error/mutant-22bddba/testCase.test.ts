import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q function in global context", () => {
    it("should set the Q global correctly in a browser environment", () => {
        // Since Jest runs in a Node.js environment by default, we need to mock the 'window' object
        const window = global as any;
        delete window.Q;
        
        // Load the Q library
        const qCode = `
            (function (definition) {
                // This file will function properly as a <script> tag, or a module
                // using CommonJS and NodeJS or RequireJS module formats.  In
                // Common/Node/RequireJS, the module exports the Q API and when
                // executed as a simple <script>, it creates a Q global instead.

                // Montage Require
                if (typeof bootstrap === "function") {
                    bootstrap("promise", definition);

                // CommonJS
                } else if (typeof exports === "object" && typeof module === "object") {
                    module.exports = definition();

                // RequireJS
                } else if (typeof define === "function" && define.amd) {
                    define(definition);

                // SES (Secure EcmaScript)
                } else if (typeof ses !== "undefined") {
                    if (!ses.ok()) {
                        return;
                    } else {
                        ses.makeQ = definition;
                    }

                // <script>
                } else if (typeof window !== "undefined" || typeof self !== "undefined") {
                    // Prefer window over self for add-on scripts. Use self for
                    // non-windowed contexts.
                    var global = typeof window !== "undefined" ? window : self;

                    // Get the `window` object, save the previous Q global
                    // and initialize Q as a global.
                    var previousQ = global.Q;
                    global.Q = definition();

                    // Add a noConflict function so Q can be removed from the
                    // global namespace.
                    global.Q.noConflict = function () {
                        global.Q = previousQ;
                        return this;
                    };

                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }

            })(function () {
                // ... rest of the Q library code ...
            });
        `;
        // Evaluate the Q library code in the global context
        eval(qCode);
        
        expect(window.Q).toBeDefined();
    });
});