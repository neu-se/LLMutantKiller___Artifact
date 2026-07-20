describe("Q function", () => {
    it("should throw an error when the environment is not recognized", async () => {
        // @ts-ignore
        const originalBootstrap = global.bootstrap;
        // @ts-ignore
        const originalDefine = global.define;
        // @ts-ignore
        const originalExports = global.exports;
        // @ts-ignore
        const originalModule = global.module;
        // @ts-ignore
        const originalSes = global.ses;

        // @ts-ignore
        global.bootstrap = undefined;
        // @ts-ignore
        global.define = undefined;
        // @ts-ignore
        global.exports = undefined;
        // @ts-ignore
        global.module = undefined;
        // @ts-ignore
        global.ses = undefined;

        expect(() => {
            // @ts-ignore
            (function (definition) {
                "use strict";
                // This file will function properly as a <script> tag, or a module
                // using CommonJS and NodeJS or RequireJS module formats.  In
                // Common/Node/RequireJS, the module exports the Q API and when
                // executed as a simple <script>, it creates a Q global instead.
                // Montage Require
                if (typeof bootstrap === "function") {
                    bootstrap("promise", definition);
                }
                // CommonJS
                else if (typeof exports === "object" && typeof module === "object") {
                    module.exports = definition();
                }
                // RequireJS
                else if (typeof define === "function" && define.amd) {
                    define(definition);
                }
                // SES (Secure EcmaScript)
                else if (typeof ses !== "undefined") {
                    if (!ses.ok()) {
                        return;
                    } else {
                        ses.makeQ = definition;
                    }
                }
                // <script>
                else if (false) {
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
                "use strict";
                // implementation of Q
            });
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");

        // @ts-ignore
        global.bootstrap = originalBootstrap;
        // @ts-ignore
        global.define = originalDefine;
        // @ts-ignore
        global.exports = originalExports;
        // @ts-ignore
        global.module = originalModule;
        // @ts-ignore
        global.ses = originalSes;
    });
});