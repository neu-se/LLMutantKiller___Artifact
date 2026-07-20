import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should filter internal and Node frames from stack traces', () => {
        const error = new Error();
        error.stack = "Error\n    at internalFrame (internal.js:1:1)\n    at nodeFrame (node.js:2:2)\n    at externalFrame (external.js:3:3)";
        const filteredStack = Q.filterStackString(error.stack);

        expect(filteredStack).toBe("Error\n    at externalFrame (external.js:3:3)");
    });
});