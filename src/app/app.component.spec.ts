import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarvelApiService } from './services/marvel-api.service';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        CharacterListComponent,
        CharacterDetailsComponent
      ],
      providers: [MarvelApiService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA

    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'marvel-api-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('marvel-api-app');
  });
});
