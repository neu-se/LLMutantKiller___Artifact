import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('QReturnValue', function () {
    it('should throw an error when QReturnValue is not defined', function () {
        let originalQReturnValue = Q.QReturnValue;
        Q.QReturnValue = undefined;
        expect(function () {
            throw new Q.QReturnValue('test');
        }).toThrowError('QReturnValue is not defined');
        Q.QReturnValue = originalQReturnValue;
    });
});