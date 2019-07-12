import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

interface AddressInfo {
	formattedAddress: string;
	latitude: number;
	longitude: number;
	extra: any;
	administrativeLevels: any;
	streetNumber: string;
	streetName: string;
	city: string;
	country: string;
	countryCode: string;
	zipcode: string;
	provider: string;
}

interface Location {
	latitude: number;
	longitude: number;
}

@Injectable()
export class GeocoderService {
	/**
	 * Constructor
	 * @param {HttpClient} http
	 */
	constructor(private http: HttpClient) {}

	/**
	 * Convert an address to geo-coordinates
	 * @param {string|string[]} input
	 *  If input is an array, empty values will be removed.
	 * @return {Promise<Location>}
	 */
	async convert(input: string | string[]): Promise<Location> {
		// Join parts
		const value =
			input instanceof Array ? input.filter(x => x).join(', ') : input;
		// Send request
		return <Location>await this.http
			.get(`${environment.api.uri}/geocoder/convert`, {
				params: { address: value }
			})
			.toPromise();
	}

	/**
	 * Convert geo-coordinates to address info
	 * @param {number} latitude
	 * @param {number} longitude
	 * @return {Promise<AddressInfo>}
	 */
	async reverse(latitude: number, longitude: number): Promise<AddressInfo> {
		// Send request
		return <AddressInfo>await this.http
			.get(`${environment.api.uri}/geocoder/reverse`, {
				params: {
					latitude: latitude.toString(),
					longitude: longitude.toString()
				}
			})
			.toPromise();
	}
}
