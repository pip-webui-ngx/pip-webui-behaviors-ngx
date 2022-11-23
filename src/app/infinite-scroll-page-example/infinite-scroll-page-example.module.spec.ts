import { InfiniteScrollPageExampleModule } from './infinite-scroll-page-example.module';

describe('InfiniteScrollPageExampleModule', () => {
  let infiniteScrollPageExampleModule: InfiniteScrollPageExampleModule;

  beforeEach(() => {
    infiniteScrollPageExampleModule = new InfiniteScrollPageExampleModule();
  });

  it('should create an instance', () => {
    expect(infiniteScrollPageExampleModule).toBeTruthy();
  });
});
