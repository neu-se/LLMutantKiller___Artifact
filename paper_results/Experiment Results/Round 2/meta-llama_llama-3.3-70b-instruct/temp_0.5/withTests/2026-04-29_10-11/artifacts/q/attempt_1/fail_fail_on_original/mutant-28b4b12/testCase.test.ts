import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should call the post method with the provided arguments', () => {
        const obj = {
            post: jest.fn(),
        };

        Q(obj).post('method', ['arg1', 'arg2']);

        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.post).toHaveBeenCalledWith('method', ['arg1', 'arg2']);
    });
});