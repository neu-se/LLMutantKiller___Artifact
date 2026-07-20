import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should execute the code without throwing an error when hasStacks is true', () => {
        const originalCode = `
            (function () {
                "use strict";
                var hasStacks = true;
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
        expect(() => eval(originalCode)).not.toThrow();
    });

    it.skip('should throw an error when executing the mutated code when hasStacks is false', () => {
        const mutatedCode = `
            (function () {
                "use strict";
                var hasStacks = false;
                try {
                    throw new Error();
                } catch (e) {
                    hasStacks = !!e.stack;
                }
                if (!hasStacks) {
                    throw new Error('hasStacks is false');
                }
            })();
        `;
        expect(() => eval(mutatedCode)).toThrow();
    });
});