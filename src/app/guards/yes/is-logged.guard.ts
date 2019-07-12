import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class IsLoggedGuard implements CanActivate {
	constructor() {}

	async canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		return true;
	}
}
