import { InfiniteScrollExampleModule } from './infinite-scroll-example.module';

describe('InfiniteScrollExampleModule', () => {
  let infiniteScrollExampleModule: InfiniteScrollExampleModule;

  beforeEach(() => {
    infiniteScrollExampleModule = new InfiniteScrollExampleModule();
  });

  it('should create an instance', () => {
    expect(infiniteScrollExampleModule).toBeTruthy();
  });
});
