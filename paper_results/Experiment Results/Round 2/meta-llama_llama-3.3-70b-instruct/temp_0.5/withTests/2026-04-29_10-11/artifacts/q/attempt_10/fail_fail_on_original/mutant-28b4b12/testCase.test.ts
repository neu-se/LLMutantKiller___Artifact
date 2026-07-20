import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should pass the arguments to the post method', () => {
        const obj = {
            post: jest.fn(),
        };

        Q.post(obj, 'method', ['arg1', 'arg2']);
        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.post).toHaveBeenCalledWith('arg1', 'arg2');
    });
});