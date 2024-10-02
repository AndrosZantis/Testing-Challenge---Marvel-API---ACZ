import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelApiService } from '../../services/marvel-api.service';
import { Character } from '../../_models/character.model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
})
export class CharacterDetailsComponent implements OnInit {
 // Input decorator to accept character data
  @Input() character!: Character;
   // Event emitter for closing
  @Output() close: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private route: ActivatedRoute,
    private marvelApi: MarvelApiService
  ) {}

  public ngOnInit(): void {
    // Check if character is defined and has an ID before fetching details
    if (this.character && this.character.id) {
      this.getCharacterDetails(this.character.id);
    } else {
      console.error('Character input is not defined or missing ID');
    }
  }

  public getCharacterDetails(id: number): void {
    this.marvelApi.getCharacterDetails(id).subscribe((data: Character[]) => {
      if (data && data.length > 0) {
        this.character = data[0]; // Set the character from the response
      } else {
        console.error('No character found with the given ID');
      }
    });
  }

    //Method to handle back button click
  public onClose(){
    //Emit close event
    this.close.emit();
  }
}
