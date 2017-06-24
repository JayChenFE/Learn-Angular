import { TestBed, inject } from '@angular/core/testing';

import { BingImgService } from './bing-img.service';

describe('BingImgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BingImgService]
    });
  });

  it('should be created', inject([BingImgService], (service: BingImgService) => {
    expect(service).toBeTruthy();
  }));
});
