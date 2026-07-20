import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should call the post method with the provided arguments', () => {
        const obj = {
            method: jest.fn(),
        };

        Q(obj).post('method', ['arg1', 'arg2']);

        expect(obj.method).toHaveBeenCalledTimes(1);
        expect(obj.method).toHaveBeenCalledWith('arg1', 'arg2');
    });
});