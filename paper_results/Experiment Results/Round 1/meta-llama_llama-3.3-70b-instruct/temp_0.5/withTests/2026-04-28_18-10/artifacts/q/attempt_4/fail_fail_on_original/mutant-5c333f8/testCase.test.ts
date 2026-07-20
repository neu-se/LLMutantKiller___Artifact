import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('isInternalFrame', () => {
    it('checks if a given stack line is an internal frame', () => {
        const stackLine = `at Q.nextTick (q.js:123:45)`;
        expect(Q.isInternalFrame(stackLine)).toBe(true);
    });

    it('checks if a given stack line is not an internal frame', () => {
        const stackLine = 'at someFunction (someFile.js:1:2)';
        expect(Q.isInternalFrame(stackLine)).toBe(false);
    });
});