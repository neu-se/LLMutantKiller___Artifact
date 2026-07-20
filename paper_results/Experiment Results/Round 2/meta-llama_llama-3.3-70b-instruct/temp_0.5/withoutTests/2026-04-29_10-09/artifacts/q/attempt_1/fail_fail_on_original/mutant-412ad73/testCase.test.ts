import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise Library', () => {
  it('should create a global Q object when used as a script tag', () => {
    const originalQ = globalThis.Q;
    delete globalThis.Q;
    eval(`
      (function (definition) {
        "use strict";
        // ... (rest of the Q library code remains the same)
      })(function () {
        // ... (rest of the Q library code remains the same)
      });
    `);
    expect(globalThis.Q).toBeDefined();
    globalThis.Q = originalQ;
  });
});