import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when hasStacks is false and return statement is not present', () => {
        const originalCode = `
            (function () {
                "use strict";
                var hasStacks = false;
                try {
                    throw new Error();
                } catch (e) {
                    hasStacks = !!e.stack;
                }
                if (!hasStacks) {
                    return;
                }
            })();
        `;
        const mutatedCode = `
            (function () {
                "use strict";
                var hasStacks = false;
                try {
                    throw new Error();
                } catch (e) {
                    hasStacks = !!e.stack;
                }
                if (!hasStacks) {}
            })();
        `;

        expect(() => eval(originalCode)).not.toThrow();
        expect(() => eval(mutatedCode)).toThrow();
    });
});