describe("Q", () => {
  it("should export Q when used as a CommonJS module", () => {
    const originalModuleExports = module.exports;
    const originalExports = exports;
    exports = {};
    module.exports = exports;
    const definition = function () {
      "use strict";

      // This file will function properly as a <script> tag, or a module
      // using CommonJS and NodeJS or RequireJS module formats.  In
      // Common/Node/RequireJS, the module exports the Q API and when
      // executed as a simple <script>, it creates a Q global instead.

      // Montage Require
      if (typeof bootstrap === "function") {
        // bootstrap("promise", definition);

      // CommonJS
      } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

      // RequireJS
      } else if (typeof define === "function" && define.amd) {
        // define(definition);

      // SES (Secure EcmaScript)
      } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
          return;
        } else {
          // ses.makeQ = definition;
        }

      // <script>
      } else if (typeof global !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var globalObject = global;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = globalObject.Q;
        globalObject.Q = {};

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        globalObject.Q.noConflict = function () {
          globalObject.Q = previousQ;
          return this;
        };

      } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
      }
    };
    (function (definition) {
      definition();
    })(definition);
    expect(module.exports).toBeInstanceOf(Function);
    module.exports = originalModuleExports;
    exports = originalExports;
  });
});