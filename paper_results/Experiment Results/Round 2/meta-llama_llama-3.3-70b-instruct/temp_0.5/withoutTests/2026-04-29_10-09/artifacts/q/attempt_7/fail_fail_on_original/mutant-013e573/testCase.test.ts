import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call a method of a Node-style object with the correct arguments', () => {
        const object = {
            method: jest.fn(),
        };

        const args = ['arg1', 'arg2'];
        const promise = q.npost(object, 'method', args);
        promise.then(() => {
            expect(object.method).toHaveBeenCalledTimes(1);
            expect(object.method).toHaveBeenCalledWith('arg1', 'arg2', expect.any(Function));
        });
        expect(object.method).toHaveBeenCalledTimes(1);
        expect(object.method).toHaveBeenCalledWith('arg1', 'arg2', expect.any(Function));
    });
});