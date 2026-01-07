import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../app.constants';

export interface Address {
  id: number;
  type: 'home' | 'work' | 'other';
  label: string;
  details?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  zip_code?: string;
  isDefault?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AddressesService {
  private apiUrl = `${BACKEND_URL}/addresses.php`;

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  updateAddress(address: Address): Observable<any> {
    // Backend expects: user_id, label, address_line1, address_line2, city, zip_code, is_default, id
    const payload = {
      id: address.id,
      user_id: (address as any).user_id || 1,
      label: address.label,
      address_line1: address.address_line1,
      address_line2: address.address_line2,
      city: address.city,
      zip_code: address.zip_code,
      is_default: address.isDefault ? 1 : 0
    };
    return this.http.put(this.apiUrl, payload);
  }
}
