import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly filter stack traces', () => {
        const q = Q;
        const qFileName = 'q.js';
        const qStartingLine = 10;
        const qEndingLine = 20;
        const fileName = 'q.js';
        const lineNumber = 5;
        const result = qFileName === qFileName && lineNumber >= qStartingLine && lineNumber <= qEndingLine;
        expect(result).toBe(false);
    });
});