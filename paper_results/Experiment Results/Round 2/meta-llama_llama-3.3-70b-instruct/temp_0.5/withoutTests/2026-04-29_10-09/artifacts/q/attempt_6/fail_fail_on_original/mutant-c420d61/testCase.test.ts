import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly make a stack trace long', () => {
        const error = new Error();
        error.stack = `(module.js:1:1)\n(node.js:2:2)`;
        const promise = Q();
        promise.stack = `(q.js:3:3)`;
        makeStackTraceLong(error, promise);
        expect(error.stack).toContain("(module.js:1:1)");
    });
});