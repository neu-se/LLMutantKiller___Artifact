import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to use QReturnValue', () => {
        expect(() => {
            new QReturnValue('test');
        }).toThrowError();
    });
});