import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

 setItem(key: string, value: any): void {
   try {
     localStorage.setItem(key, JSON.stringify(value));
   }catch (e) {
     console.error('Error saving to localStorage', e)
   }
 }

  getItem(key: string): any {
   try {
     return JSON.parse(localStorage.getItem(key))
   } catch (e) {
     console.error('Error getting to localStorage', e)
     return null
   }
 }
}
