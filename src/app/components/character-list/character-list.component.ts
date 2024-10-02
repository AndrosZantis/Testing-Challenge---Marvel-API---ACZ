import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from '../../services/marvel-api.service';
import { Character } from '../../_models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent implements OnInit {
  public characters: Character[] = []; // Assuming characters is an array of Character objects
  public selectedCharacter: Character | null = null; // Holds the currently selected character
  public searchTerm: string = '';
  filteredCharacters: Character[] = []; // Array for filtered characters

  public offset: number = 0;
  public error: string | null = null;


constructor(private marvelApi: MarvelApiService){}

  public ngOnInit(): void {
    this.getCharacters();
    this.searchCharacters();

}

  public getCharacters(){
    this.marvelApi.getCharacters(20, this.offset).subscribe(
      (data: any) => {
        this.characters = [...this.characters, ...data.data.results];
      },
      (error) => {
        this.error = 'Error fetching characters. Please try again later.';
      }
    );
  }

  public searchCharacters(): void {
      if(this.searchTerm){
        this.marvelApi.searchcharacters(this.searchTerm).subscribe((data:any) => {
            this.characters = data.data.results;
        });
      } else {
        this.marvelApi.getCharacters().subscribe((data:any) => {
          this.characters = data.data.results;
        });
      }
      
  }

  public loadMore(): void {
    this.offset += 20;
    this.getCharacters();
  }

    public selectCharacter(character: Character) {
    this.selectedCharacter = character; // Set the selected character
  }

   // Method to handle closing character details
   public closeCharacterDetails() {
    this.selectedCharacter = null; // Reset the selected character
  }

  
    // Method to filter characters based on the search term
    public filterCharacters() {
      if (!this.searchTerm) {
        this.filteredCharacters = this.characters; // Show all if search term is empty
      } else {
        this.filteredCharacters = this.characters.filter(character =>
          character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ); // Filter characters based on the search term
      }
    }
}

