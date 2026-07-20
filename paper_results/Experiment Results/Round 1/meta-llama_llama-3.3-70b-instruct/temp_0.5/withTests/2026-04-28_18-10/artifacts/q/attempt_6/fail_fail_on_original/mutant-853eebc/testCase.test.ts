import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should handle array_map correctly', () => {
        const array = [1, 2, 3];
        const collect = [];
        const mappedArray = Q.fcall(function() {
            array_reduce(array, function(collector, value, index) {
                collector.push(value * 2);
            }, collect);
            return collect;
        });
        return mappedArray.then(function(result) {
            expect(result).toEqual([2, 4, 6]);
        });
    });
});