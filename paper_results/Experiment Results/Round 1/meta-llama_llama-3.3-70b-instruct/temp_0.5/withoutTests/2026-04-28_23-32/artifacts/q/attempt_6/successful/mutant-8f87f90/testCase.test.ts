import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method with the correct arguments', async () => {
        const obj = {
            testMethod: jest.fn(),
        };

        const promise = q.fulfill(obj);
        promise.post('testMethod', ['arg1', 'arg2']);

        await promise;

        expect(obj.testMethod).toHaveBeenCalledTimes(1);
        expect(obj.testMethod).toHaveBeenCalledWith('arg1', 'arg2');
    });
});