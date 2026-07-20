import { Q } from "../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call a method of a Node-style object with the correct arguments', () => {
        const object = {
            method: jest.fn(),
        };

        Q.npost(object, 'method', ['arg1', 'arg2']);

        expect(object.method).toHaveBeenCalledTimes(1);
        expect(object.method).toHaveBeenCalledWith('arg1', 'arg2', expect.any(Function));
    });
});