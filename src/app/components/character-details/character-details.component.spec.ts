import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailsComponent } from './character-details.component';
import { MarvelApiService } from '../../services/marvel-api.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../_models/character.model';

// Mock data for character
const mockCharacter: Character = {
  id: 1,
  name: 'Spider-Man',
  thumbnail: { path: 'spider-man', extension: 'jpg' },
  description: 'A superhero with spider-like abilities',
  modified: new Date(),
  resourceURI: '',
  urls: [],
  comics: { available: 0, collectionURI: '', items: [], returned: 0 },
  series: { available: 0, collectionURI: '', items: [], returned: 0 },
  stories: { available: 0, collectionURI: '', items: [], returned: 0 },
  events: { available: 0, collectionURI: '', items: [], returned: 0 },
};

const mockMarvelApiService = {
  getCharacterDetails: jasmine.createSpy('getCharacterDetails').and.returnValue(of([mockCharacter])), // Mocking the response
};

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1'), // Mock route param
    },
  },
};

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let marvelApiService: MarvelApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent],
      providers: [
        { provide: MarvelApiService, useValue: mockMarvelApiService }, // Provide the mock service
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock route
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    component.character = mockCharacter; // Assign the mock character here
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch character details on initialization', () => {
    component.ngOnInit(); // Manually call ngOnInit

    expect(mockMarvelApiService.getCharacterDetails).toHaveBeenCalledWith(mockCharacter.id); // Ensure service was called with correct ID
    expect(component.character.name).toBe('Spider-Man'); // Check if character details are set correctly
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.close, 'emit'); // Spy on the close emitter
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled(); // Ensure the close event is emitted
  });

  it('should handle errors when fetching character details', () => {
    const errorMessage = 'Error fetching character details';
    mockMarvelApiService.getCharacterDetails.and.returnValue(throwError(() => new Error(errorMessage))); // Mock an error response

    component.getCharacterDetails(mockCharacter.id); 
    expect(component.character).toEqual(mockCharacter); 
  });
});