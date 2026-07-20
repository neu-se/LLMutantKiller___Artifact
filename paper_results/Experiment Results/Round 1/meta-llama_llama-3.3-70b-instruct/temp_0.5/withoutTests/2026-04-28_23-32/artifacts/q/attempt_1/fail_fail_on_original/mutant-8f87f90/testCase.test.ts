import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method with the correct arguments', () => {
        const obj = {
            testMethod: jest.fn(),
        };

        Q.fulfill(obj).post('testMethod', ['arg1', 'arg2']);

        expect(obj.testMethod).toHaveBeenCalledTimes(1);
        expect(obj.testMethod).toHaveBeenCalledWith('arg1', 'arg2');
    });
});