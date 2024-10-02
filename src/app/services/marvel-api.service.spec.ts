import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarvelApiService } from './marvel-api.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('MarvelApiService', () => {
  let service: MarvelApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP requests
      providers: [MarvelApiService], // Provide the service
    });

    service = TestBed.inject(MarvelApiService); // Inject the MarvelApiService
    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController to mock HTTP requests
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched HTTP requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it('should fetch characters from the API', () => {
      const mockResponse = { data: { results: [{ id: 1, name: 'Spider-Man' }] } };

      service.getCharacters().subscribe((response) => {
        expect(response.data.results.length).toBe(1);
        expect(response.data.results[0].name).toBe('Spider-Man');
      });

      const req = httpMock.expectOne(`${service['apiUrl']}?apikey=${service['apiKey']}`);
      expect(req.request.method).toBe('GET'); // Ensure it's a GET request
      req.flush(mockResponse); // Provide a mock response
    });

    it('should handle errors', () => {
      service.getCharacters().subscribe({
        next: () => fail('expected an error, not characters'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500); // Expecting a server error
        },
      });

      const req = httpMock.expectOne(`${service['apiUrl']}?apikey=${service['apiKey']}`);
      expect(req.request.method).toBe('GET');

      req.flush('Error fetching characters', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('searchCharacters', () => {
    it('should search for characters by name', () => {
      const searchName = 'Spider';
      const mockResponse = { data: { results: [{ id: 1, name: 'Spider-Man' }] } };

      service.searchcharacters(searchName).subscribe((response) => {
        expect(response.data.results.length).toBe(1);
        expect(response.data.results[0].name).toBe('Spider-Man');
      });

      const req = httpMock.expectOne(`${service['apiUrl']}?nameStartsWith=Spider&apikey=${service['apiKey']}`);
      expect(req.request.method).toBe('GET'); // Ensure it's a GET request
      req.flush(mockResponse); // Provide a mock response
    });
  });

  describe('getCharacterDetails', () => {
    it('should fetch character details by ID', () => {
      const characterId = 1;
      const mockResponse = { data: { id: characterId, name: 'Spider-Man' } };

      service.getCharacterDetails(characterId).subscribe((response) => {
        expect(response.data.id).toBe(characterId);
        expect(response.data.name).toBe('Spider-Man');
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${characterId}?apikey=${service['apiKey']}`);
      expect(req.request.method).toBe('GET'); // Ensure it's a GET request
      req.flush(mockResponse); // Provide a mock response
    });
  });
});
