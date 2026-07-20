describe('Q', () => {
    it('should handle CommonJS and NodeJS environment correctly', () => {
        // Create a mock for the module object
        const module = { exports: {} };

        // Create a mock for the exports object
        const exports = {};

        // Create a mock for the definition function
        const definition = () => {};

        // Save the original exports and module variables
        const originalExports = global.exports;
        const originalModule = global.module;

        // Set the exports and module variables to the mock values
        global.exports = exports;
        global.module = module;

        // Call the Q function with the definition function
        expect(() => {
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
                } else if (typeof ses!== "undefined") {
                    if (!ses.ok()) {
                        return;
                    } else {
                        ses.makeQ = definition;
                    }

                // <script>
                } else if (typeof window!== "undefined" || typeof self!== "undefined") {
                    // Prefer window over self for add-on scripts. Use self for
                    // non-windowed contexts.
                    var global = typeof window!== "undefined"? window : self;

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
                return "Q";
            });
        }).not.toThrow();

        // Restore the original exports and module variables
        global.exports = originalExports;
        global.module = originalModule;

        // Set the exports and module variables to the mock values
        global.exports = {};
        global.module = null;

        // Call the Q function with the definition function
        expect(() => {
            (function (definition) {
                // This file will function properly as a <script> tag, or a module
                // using CommonJS and NodeJS or RequireJS module formats.  In
                // Common/Node/RequireJS, the module exports the Q API and when
                // executed as a simple <script>, it creates a Q global instead.

                // Montage Require
                if (typeof bootstrap === "function") {
                    bootstrap("promise", definition);

                // CommonJS
                } else if (typeof exports === "object" || typeof module === "object") {
                    module.exports = definition();

                // RequireJS
                } else if (typeof define === "function" && define.amd) {
                    define(definition);

                // SES (Secure EcmaScript)
                } else if (typeof ses!== "undefined") {
                    if (!ses.ok()) {
                        return;
                    } else {
                        ses.makeQ = definition;
                    }

                // <script>
                } else if (typeof window!== "undefined" || typeof self!== "undefined") {
                    // Prefer window over self for add-on scripts. Use self for
                    // non-windowed contexts.
                    var global = typeof window!== "undefined"? window : self;

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
                return "Q";
            });
        }).toThrowError("Cannot set properties of null (setting 'exports')");

        // Restore the original exports and module variables
        global.exports = originalExports;
        global.module = originalModule;
    });
});