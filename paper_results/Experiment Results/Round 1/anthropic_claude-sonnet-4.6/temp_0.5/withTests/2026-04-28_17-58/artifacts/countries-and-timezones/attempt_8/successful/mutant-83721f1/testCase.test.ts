let mockBuildCount = 0;

jest.mock('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json', () => ({
  countries: {},
  timezones: {
    'A/One':   { c: [], u: 0, d: 0 },
    'A/Two':   { c: [], u: 0, d: 0 },
    'A/Three': { c: [], u: 0, d: 0 },
    'A/Four':  { c: [], u: 0, d: 0 },
    'A/Five':  { c: [], u: 0, d: 0 },
    'A/Six':   { c: [], u: 0, d: 0 },
    'A/Seven': { c: [], u: 0, d: 0 },
  }
}));

jest.mock('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone.js', () => ({
  __esModule: true,
  default: (_data: any, _name: string) => {
    mockBuildCount++;
    return { name: undefined, countries: [], utcOffset: 0, utcOffsetStr: '+00:00', dstOffset: 0, dstOffsetStr: '+00:00', aliasOf: null };
  }
}));

describe('getAllTimezones memoization condition', () => {
  it('should skip forEach on second call when totalTimezones equals memoizedTimezones', async () => {
    const { getAllTimezones } = await import('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js');
    
    getAllTimezones();
    expect(mockBuildCount).toBe(7);
    
    getAllTimezones();
    // Original: totalTimezones(7) !== memoizedTimezones(7) is FALSE -> skip forEach -> buildCount stays 7
    // Mutated: if(true) -> forEach -> getTimezone called 7 times -> cache miss (name=undefined) -> buildCount becomes 14
    expect(mockBuildCount).toBe(7);
  });
});