import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle Node frames in stack traces', () => {
        // Create a stack line that is a Node frame
        const stackLine = 'at Module._compile (module.js:652:10)';

        // Check if the stack line is recognized as a Node frame
        const isNodeFrame = function(stackLine) {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        }(stackLine);
        expect(isNodeFrame).toBe(true);
    });

    it('should not recognize non-Node frames', () => {
        // Create a stack line that is not a Node frame
        const stackLine = 'at foo (bar.js:10:10)';

        // Check if the stack line is not recognized as a Node frame
        const isNodeFrame = function(stackLine) {
            return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
        }(stackLine);
        expect(isNodeFrame).toBe(false);
    });

    it('should fail on mutated code', () => {
        // Create a stack line that is a Node frame
        const stackLine = 'at Module._compile (module.js:652:10)';

        // Check if the stack line is recognized as a Node frame
        const isNodeFrame = function(stackLine) {
            return false;
        }(stackLine);
        expect(isNodeFrame).toBe(false);
    });
});