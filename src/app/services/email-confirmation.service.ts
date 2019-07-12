import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmailConfirmationService {
	/**
	 * Base route for this module
	 * @type {string}
	 * @private
	 */
	private _uri = `${environment.api.uri}/email-confirmation`;

	/**
	 * Constructor
	 * @param {HttpClient} http
	 */
	constructor(private http: HttpClient) {}

	/**
	 * Confirm the email address
	 * @param {string} userId
	 * @param {string} confirmationCode
	 * @return {Promise<void>}
	 */
	async confirm(userId: string, confirmationCode: string): Promise<void> {
		const body = {
			_id: userId,
			code: confirmationCode
		};
		await this.http.put(this._uri, body).toPromise();
	}
}
