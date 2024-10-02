import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  private apiUrl = 'https://gateway.marvel.com/v1/public/characters';
  private apiKey = 'Insert public key from marvel here';

  constructor(private http: HttpClient) {
  }

  public getCharacters(limit = 100, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?apikey=${this.apiKey}`).pipe(
      catchError(error => {
        console.error('Error fetching characters', error);
        return throwError(error);
      })
    );
  }

    public searchcharacters(name: string): Observable<any> {
      return this.http.get(`${this.apiUrl}?nameStartsWith=${name}&apikey=${this.apiKey}`);
    }

    public getCharacterDetails(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}?apikey=${this.apiKey}`);
    }
    
   }

