import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PasswordService {
	/**
	 * Base route for this module
	 * @type {string}
	 * @private
	 */
	private _uri = `${environment.api.uri}/password/reset`;

	/**
	 * Constructor
	 * @param {HttpClient} http
	 */
	constructor(private http: HttpClient) {}

	/**
	 * Send request to API for a new password token
	 * @param {string} email
	 * @return {Promise<void>}
	 */
	async request(email: string): Promise<void> {
		await this.http.post(this._uri, { email }).toPromise();
	}

	/**
	 * Do the password reset
	 * @param {string} userId
	 * @param {string} resetCode
	 * @param {string} newPassword
	 * @return {Promise<void>}
	 */
	async reset(
		userId: string,
		resetCode: string,
		newPassword: string
	): Promise<void> {
		const body = {
			_id: userId,
			code: resetCode,
			password: newPassword
		};
		await this.http.put(this._uri, body).toPromise();
	}
}
