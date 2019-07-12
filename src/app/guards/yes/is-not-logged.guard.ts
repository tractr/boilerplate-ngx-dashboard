import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class IsNotLoggedGuard implements CanActivate {
	constructor() {}

	async canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		return false;
	}
}
