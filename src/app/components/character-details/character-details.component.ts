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
      this.getCharacterDetails(this.character.id);
  }
  //Method that getsChatacterDetails
  public getCharacterDetails(id: number):void {
    this.marvelApi.getCharacterDetails(id).subscribe((data:
      Character[]) => {
     this.character = data[0];
   });
  }

    //Method to handle back button click
  public onClose(){
    //Emit close event
    this.close.emit();
  }
}
