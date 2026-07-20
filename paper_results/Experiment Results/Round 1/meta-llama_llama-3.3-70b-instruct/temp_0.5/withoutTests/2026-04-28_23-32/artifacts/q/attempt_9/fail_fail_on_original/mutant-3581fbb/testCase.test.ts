import { Q } from "./q.js";

describe('Q', () => {
    it('should filter out internal frames but not Node.js frames for the mutated code', () => {
        const error = new Error();
        error.stack = `Error
    at q.js:10:10
    at node:internal/process/next_tick.js:68:7`;
        const filteredStack = Q.filterStackString(error.stack);
        const lines = filteredStack.split('\n');

        expect(lines.some(line => line.includes('q.js'))).toBe(false);
        expect(lines.some(line => line.includes('node:internal'))).toBe(true);
    });
});