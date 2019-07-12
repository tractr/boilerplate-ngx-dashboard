import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';

interface S3FormData {
	key: string;
	bucket: string;
	policy: string;
	'x-amz-date': string;
	'x-amz-algorithm': string;
	'x-amz-credential': string;
	'x-amz-signature': string;
	file?: any;
}

interface S3Token {
	post_url: string;
	form_data: S3FormData;
}

@Injectable()
export class S3Service {
	/**
	 * Constructor
	 * @param {HttpClient} http
	 */
	constructor(private http: HttpClient) {}

	/**
	 * Convert token to form data
	 * @param {S3Token} token
	 * @return {FormData}
	 */
	private static getFormData(token: S3Token): FormData {
		const formData = new FormData();
		for (const key in token.form_data) {
			if (token.form_data.hasOwnProperty(key)) {
				formData.append(key, token.form_data[key]);
			}
		}

		return formData;
	}

	/**
	 * Upload file to S3 from an input and returns its URI
	 * @param {HTMLInputElement} input
	 * @return {Promise<string>}
	 */
	async uploadFromInput(input: HTMLInputElement): Promise<string> {
		// Check if a file is present
		if (input.files.length === 0) {
			throw new Error('No input file');
		}

		return <string>await this.uploadFile(input.files.item(0));
	}

	/**
	 * Upload file to S3
	 * @param {File} file
	 * @return {Promise<string>}
	 */
	async uploadFile(file: File): Promise<string> {
		// Get token from S3
		const s3Token = await this.getToken(file.type);
		const formData = S3Service.getFormData(s3Token);
		// Append file
		formData.append('file', file);
		// Send request
		return <string>await this.http
			.post(s3Token.post_url, formData)
			.toPromise()
			.then(() => {
				return s3Token.form_data.key;
			});
	}

	/**
	 * Get an upload token
	 * @param {string} mime
	 * @return {Promise<S3Token>}
	 */
	private async getToken(mime: string): Promise<S3Token> {
		return <S3Token>(
			await this.http
				.get(`${environment.api.uri}/s3/token`, { params: { mime } })
				.toPromise()
		);
	}
}
