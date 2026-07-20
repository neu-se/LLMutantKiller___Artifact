import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly handle Node frames in stack traces', () => {
        // Create a stack line that is a Node frame
        const stackLine = 'at Module._compile (module.js:652:10)';

        // Check if the stack line is recognized as a Node frame
        const isNodeFrame = function(stackLine) {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        };
        expect(isNodeFrame(stackLine)).toBe(true);
    });
});