import { Q } from "../../../../../q";

describe('q', () => {
    it('should return the correct file name and line number for a given stack line', () => {
        const error = new Error();
        const stackLine = error.stack && error.stack.split('\n')[1];
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeNull();
        expect(result[0]).not.toBeNull();
        expect(result[1]).not.toBeNull();
    });
});