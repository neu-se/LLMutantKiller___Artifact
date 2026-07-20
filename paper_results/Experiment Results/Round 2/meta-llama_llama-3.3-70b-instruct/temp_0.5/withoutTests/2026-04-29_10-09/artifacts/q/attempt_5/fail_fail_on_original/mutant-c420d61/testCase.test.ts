import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly filter Node.js frames from a stack trace', () => {
        const error = new Error();
        error.stack = `(node.js:1:1)\n(module.js:2:2)`;
        const filterStackString = (stackString: string) => {
            const lines = stackString.split("\n");
            const desiredLines = [];
            for (let i = 0; i < lines.length; ++i) {
                const line = lines[i];
                if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
                    desiredLines.push(line);
                }
            }
            return desiredLines.join("\n");
        };
        const isInternalFrame = (line: string) => line.indexOf("q.js") !== -1;
        const isNodeFrame = (line: string) => line.indexOf("(module.js:") !== -1 || line.indexOf("(node.js:") !== -1;
        expect(filterStackString(error.stack)).toBe("(module.js:2:2)");
    });
});