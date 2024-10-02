import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailsComponent } from './character-details.component';
import { MarvelApiService } from '../../services/marvel-api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Character } from '../../_models/character.model';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mock data
const mockCharacter: Character = {
  id: 1,
  name: 'Spider-Man',
  thumbnail: { path: 'spider-man-path', extension: 'jpg' },
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
  getCharacterDetails: jasmine.createSpy('getCharacterDetails').and.returnValue(of([mockCharacter])),
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
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent],
      providers: [
        { provide: MarvelApiService, useValue: mockMarvelApiService }, // Provide the mocked MarvelApiService
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mocked ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    marvelApiService = TestBed.inject(MarvelApiService);
    debugElement = fixture.debugElement;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch character details on initialization', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id'); // Check that the route param is accessed
    expect(mockMarvelApiService.getCharacterDetails).toHaveBeenCalledWith('1'); // Check that the service method is called with the correct ID
    expect(component.character).toEqual(mockCharacter); // Ensure the character is set correctly
  });

  it('should render character details in the template', () => {
    fixture.detectChanges(); // Trigger change detection

    const characterName = debugElement.query(By.css('h1')).nativeElement;
    expect(characterName.textContent).toContain('Spider-Man'); // Verify the character name is rendered

    const characterDescription = debugElement.query(By.css('p')).nativeElement;
    expect(characterDescription.textContent).toContain('A superhero with spider-like abilities'); // Verify the character description is rendered
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.close, 'emit'); // Spy on the close emitter
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled(); // Ensure the close event is emitted
  });

  it('should call onClose when the back button is clicked', () => {
    spyOn(component, 'onClose');
    const button = debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.onClose).toHaveBeenCalled(); // Verify the onClose method is triggered on button click
  });
});
