import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { MarvelApiService } from '../../services/marvel-api.service';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Character } from '../../_models/character.model';
import { FormsModule } from '@angular/forms';

// Mock data for characters
const mockCharacters: Character[] = [
  { id: 1, name: 'Spider-Man', thumbnail: { path: 'spider-man', extension: 'jpg' }, description: 'A superhero with spider-like abilities', modified: new Date(), resourceURI: '', urls: [], comics: { available: 0, collectionURI: '', items: [], returned: 0 }, series: { available: 0, collectionURI: '', items: [], returned: 0 }, stories: { available: 0, collectionURI: '', items: [], returned: 0 }, events: { available: 0, collectionURI: '', items: [], returned: 0 }},
  { id: 2, name: 'Iron Man', thumbnail: { path: 'iron-man', extension: 'jpg' }, description: 'A billionaire industrialist and genius inventor.', modified: new Date(), resourceURI: '', urls: [], comics: { available: 0, collectionURI: '', items: [], returned: 0 }, series: { available: 0, collectionURI: '', items: [], returned: 0 }, stories: { available: 0, collectionURI: '', items: [], returned: 0 }, events: { available: 0, collectionURI: '', items: [], returned: 0 }},
];

const mockMarvelApiService = {
  getCharacters: jasmine.createSpy('getCharacters').and.returnValue(of({ data: { results: mockCharacters } })),
  searchcharacters: jasmine.createSpy('searchcharacters').and.returnValue(of({ data: { results: [mockCharacters[0]] } })),
};

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let marvelApiService: MarvelApiService;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      imports: [FormsModule], // Import FormsModule here
      providers: [
        { provide: MarvelApiService, useValue: mockMarvelApiService },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    marvelApiService = TestBed.inject(MarvelApiService);
    debugElement = fixture.debugElement;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch characters on initialization', () => {
    component.ngOnInit(); // Manually trigger ngOnInit

    expect(marvelApiService.getCharacters).toHaveBeenCalledWith(20, 0); // Ensure the service was called
    expect(component.characters.length).toBe(2); // Ensure the characters array has the correct length
    expect(component.characters[0].name).toBe('Spider-Man'); // Check the first character's name
  });

  it('should handle errors when fetching characters', () => {
    mockMarvelApiService.getCharacters.and.returnValue(throwError(() => new Error('Error fetching characters')));
    component.getCharacters(); // Call getCharacters directly
    expect(component.error).toBe('Error fetching characters. Please try again later.'); // Check if the error message is set
  });
  
  it('should search for characters by search term', () => {
    component.searchTerm = 'Spider';
    component.searchCharacters();
    expect(marvelApiService.searchcharacters).toHaveBeenCalledWith('Spider');
    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Spider-Man');
  });

  it('should load more characters and increase offset', () => {
    component.loadMore();
    expect(component.offset).toBe(20);
    expect(marvelApiService.getCharacters).toHaveBeenCalledWith(20, 20); // Load more with offset increased
  });

  it('should select a character', () => {
    const character = mockCharacters[0];
    component.selectCharacter(character);
    expect(component.selectedCharacter).toEqual(character);
  });

  it('should close character details', () => {
    component.selectedCharacter = mockCharacters[0];
    component.closeCharacterDetails();
    expect(component.selectedCharacter).toBeNull();
  });

  it('should filter characters based on the search term', () => {
    component.characters = mockCharacters; // Set characters
    component.searchTerm = 'Iron';
    component.filterCharacters();
    expect(component.filteredCharacters.length).toBe(1);
    expect(component.filteredCharacters[0].name).toBe('Iron Man');
  });

  it('should show all characters if the search term is empty', () => {
    component.characters = mockCharacters; // Set characters
    component.searchTerm = '';
    component.filterCharacters();
    expect(component.filteredCharacters.length).toBe(mockCharacters.length);
  });
});
