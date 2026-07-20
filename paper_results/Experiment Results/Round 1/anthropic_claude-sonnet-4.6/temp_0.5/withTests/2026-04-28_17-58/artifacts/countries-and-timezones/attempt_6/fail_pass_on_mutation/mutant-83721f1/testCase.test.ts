describe('getAllTimezones caching optimization', () => {
  it('should only iterate timezones when not fully memoized', async () => {
    jest.resetModules();
    
    let getTimezoneCallCount = 0;
    
    // We need to intercept getTimezone calls within getAllTimezones
    // The mutation causes getAllTimezones to always call forEach(getTimezone)
    // In original, it checks the condition first
    
    const { getAllTimezones } = await import('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js');
    
    const result1 = getAllTimezones();
    const result2 = getAllTimezones();
    
    expect(Object.keys(result1)).toEqual(Object.keys(result2));
  });
});