describe('Q Promise Library', () => {
  it('should create a promise', () => {
    const promise = (function (definition) {
      "use strict";
      // This file will function properly as a <script> tag, or a module
      // using CommonJS and NodeJS or RequireJS module formats.  In
      // Common/Node/RequireJS, the module exports the Q API and when
      // executed as a simple <script>, it creates a Q global instead.

      // Montage Require
      if (typeof bootstrap === "function") {
        bootstrap("promise", definition);
      }
      // ... (rest of the Q library code remains the same)
    })(function () {
      // ... (rest of the Q library code remains the same)
    });
    expect(promise).toBeDefined();
  });
});